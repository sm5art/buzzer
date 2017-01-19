const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use('/static', express.static('static'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let players = {};
let clients = [];
let buzzList = [];
let currentID = 0;

app.post('/auth', (req, res)=>{
  const name = req.body.name;
  players[currentID] = {name, score:0};
  currentID += 1;
  console.log(players)
  res.json({id: currentID-1, name})
});

app.get('*', (req, res)=>{
  res.render('index.ejs')
});

function update(){
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
    if(socket.player_id != undefined){
      delete players[socket.player_id];
      console.log(`Player id: ${socket.player_id} has disconnected. Destroying player from game.`)
    }
    clients.splice(clients.indexOf(socket), 1);
    if(socket.player_id != undefined){
      update()
    }
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
        s.emit('kick')
        break;
      }
    }
  })

  socket.on('update', (data)=>{
    players[data.id]["score"] += parseInt(data.score);
    update()
  })

  socket.on('buzz', (data)=>{
    buzzList.push(data.id)
    socket.emit('buzz', {ranking:buzzList.length})
    update()
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
