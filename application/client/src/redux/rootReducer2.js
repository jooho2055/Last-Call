
import { combineReducers } from 'redux';
import userReducer from './path-to-userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
