const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');



var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/static', express.static('static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let players = {};
let clients = [];
let buzzList = [];
let currentID = 0;

app.post('/auth', (req, res)=>{
  const name = req.body.name;
  players[currentID] = { name: name.substring(0,30), score:0};
  currentID += 1;
  res.cookie("auth", JSON.stringify({id: currentID-1, name}))
  res.json({id: currentID-1, name})
});

app.get('/logout', (req, res)=>{
  console.log(req.cookies.auth)
  if(req.cookies.auth != undefined){
    delete players[JSON.parse(req.cookies.auth).id]
    update()
    res.clearCookie('auth')
  }
  res.redirect("/")
})

app.get('*', (req, res)=>{
  res.render('index.ejs')
});

function update(){
  console.log(players, buzzList)
  clients.map((socket)=>{
    socket.emit('update', {players, buzzers: buzzList})
  })
}

function reset(){
  clients.map((socket)=>{
    socket.emit('reset')
  })
}

io.on('connection', (socket)=>{
  console.log('A player has loaded buzzerapp')
  clients.push(socket)
  socket.on('disconnect', ()=>{
    clients.splice(clients.indexOf(socket), 1);
  })

  socket.on('init', ()=>{
    update()
  })

  socket.on('auth', (data)=>{
    socket.player_id = data.id;
    update()
  })

  socket.on('kick', (data)=>{
    for(let s of clients){
      if(s.player_id == data.id){
        delete players[data.id];
        update()
        s.emit('kick')
        break;
      }
    }
  })
  socket.on('kickall', ()=>{
    for(let s of clients){
      s.emit('kick')
    }
    players = {}
    buzzList = []
  })

  socket.on('update', (data)=>{
    players[data.id]["score"] += parseInt(data.score);
    update()
  })

  socket.on('buzz', (data)=>{
    if(buzzList.indexOf(data.id) == -1 && players[data.id] != undefined){
      buzzList.push(data.id);
      socket.emit('buzz', {ranking:buzzList.length});
      update();
    }
  })

  socket.on('reset', ()=>{
    buzzList = []
    reset()
    update()
  })
})

http.listen(process.env.PORT, function () {
  console.log('Science Bowl Application running on port '+process.env.PORT)
});
