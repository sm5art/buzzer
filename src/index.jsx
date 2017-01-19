import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from 'react-redux';

import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import css from '../styles/main.css'

import App from '../containers/App';
import BuzzerPage from '../components/BuzzerPage';
import AdminPage from '../components/AdminPage';
import configureStore from '../store/configureStore';
import Login from '../components/Login';

import * as action_types from '../actions/MainActions';

//Needed for React Developer Tools
window.React = React;

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

socket.on('update', (data)=>{
  store.dispatch(action_types.update_server_state(data));
})

socket.on('buzz', (data)=>{
  store.dispatch(action_types.recieved_buzz(data.ranking))
})

socket.on('kick', (data)=>{
  window.location = '/'
})

socket.on('reset', ()=>{
  store.dispatch(action_types.reset_buzzer())
})

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="play" component={BuzzerPage}/>
        <Route path="game/admin" component={AdminPage}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
