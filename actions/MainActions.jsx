import * as types from '../constants/ActionTypes';
import * as state_types from '../constants/states';
import {browserHistory} from 'react-router';

/*


ADMIN STUFF THAT I DIDNT WRITE PROFESSIONALLY

*/

export function update_score(id, score){
  socket.emit('update', {id, score})
  return { type: "WHATEVER" }
}

export function kick(id){
  socket.emit('kick', {id});
  return { type: "WHATEVER" };
}

export function reset(){
  socket.emit('reset')
  return {type: "RANDOMBOIS"}
}
/*


ADMIN STUFF THAT I DIDNT WRITE PROFESSIONALLY

*/

export function dispatch_auth(name){
    return function(dispatch){
      $.post('/auth', {name}, (data)=>{
        socket.emit('auth', {id: data.id})
        dispatch(auth(data));
      })
    }
}

export function update_server_state(data){
  return { type: types.RECIEVED_SERVER_UPDATE, data}
}

export function recieved_buzz(ranking){
  let buzz = state_types.RESET
  if(ranking == 1){
    buzz = state_types.WIN
  }
  else {
    buzz = state_types.LOSE
  }
  return { type: types.RECIEVED_BUZZ,  buzzerState: buzz}
}

export function send_buzzer(id){
  return function(dispatch){
    socket.emit('buzz', {id})
  }
}

export function reset_buzzer(state){
  return { type: types.RESET_BUZZER }
}

export function auth(response) {
  return { type: types.AUTH, id: response.id, name: response.name };
}
