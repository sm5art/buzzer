import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import { Router, Route, browserHistory } from 'react-router'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    MainReducer,
    routing: routerReducer
});

export default rootReducer;
