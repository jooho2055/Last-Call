export const SET_USER_DATA = 'SET_USER_DATA';

// Action creator to set user data
export const storeUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
};
