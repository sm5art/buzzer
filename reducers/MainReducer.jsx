import { AUTH, SEND_BUZZER, RECIEVED_SERVER_UPDATE, RECIEVED_BUZZ, RESET_BUZZER, DESTROY } from '../constants/ActionTypes';
import * as types from '../constants/states';
import {browserHistory} from 'react-router';

const initialState = {
  id: undefined,
  name: undefined,
  auth: types.DEFAULT,
  buzzerState: types.RESET
};

export default function MainReducer(state = initialState, action) {
  switch (action.type) {
  case AUTH:
    return Object.assign({}, state, {id: action.id, name: action.name, auth: types.AUTHENTICATED})
  case RECIEVED_SERVER_UPDATE:
    return Object.assign({}, state, {players: action.data.players, buzzers: action.data.buzzers})
  case DESTROY:
    return Object.assign({}, initialState)
  case RECIEVED_BUZZ:
    return Object.assign({}, state, {buzzerState: action.buzzerState})
  case RESET_BUZZER:
    return Object.assign({}, state, {buzzerState: types.RESET})
  default:
    return state;
  }
}
