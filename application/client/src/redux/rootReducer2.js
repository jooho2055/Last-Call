import { combineReducers } from 'redux';
import userReducer2 from '../redux/userReducer2'; 

const rootReducer = combineReducers({
  user: userReducer2,
});

export default rootReducer;
