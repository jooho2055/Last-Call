const initialState = {
    userId: null,
    username: '',
    email: '',
    role: '',
    isLoggedIn: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          userId: action.payload.userId,
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
          isLoggedIn: true,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default userReducer;