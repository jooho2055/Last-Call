// userReducer.js

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
            // Update user data in the store
            return {
                ...state,
                ...action.payload, // Update user data fields with the payload
                idea: action.payload.idea,
                fname: action.payload.fname,
                lname: action.payload.lname,
                email: action.payload.email,
                pwd: action.payload.pwd,
                cpwd: action.payload.cpwd,
                phone: action.payload.phone,
                bio: action.payload.bio,
            };
        default:
            return state;
    }
};

export default userReducer2;
