
import { SET_USER_DATA, SET_USER_PROFILE } from '../actions/userActions2';

const initialState = {
  username: '',
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
    case SET_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer2;