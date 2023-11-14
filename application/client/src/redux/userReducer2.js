// userReducer2.js
import { SET_USER_DATA } from '../actions/userActions2';

const initialState = {
  idea: '',
  fname: '',
  lname: '',
  email: '',
  pwd: '',
  cpwd: '',
  phone: '',
  bio: '',
};

const userReducer2 = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload, 
      };
    default:
      return state;
  }
};
export default userReducer2;
