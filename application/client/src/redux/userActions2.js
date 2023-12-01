export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_USER_PROFILE = 'SET_USER_PROFILE'; 

export const storeUserData = (userData) => ({
  type: SET_USER_DATA,
  payload: userData,
});

export const setUserProfile = (userData) => ({
  type: SET_USER_PROFILE,
  payload: userData,
});
