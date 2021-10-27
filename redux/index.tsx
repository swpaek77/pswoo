import { combineReducers, createStore } from 'redux';
import LoginRedux from './LoginRedux';

const rootReducer = combineReducers({
  LoginRedux,
});

export default createStore(rootReducer);
