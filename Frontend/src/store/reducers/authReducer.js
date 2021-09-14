const initState = null;

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "update_user":
      return { ...state, ...action.payload };
    case "logout":
      return initState;
    default:
      return state;
  }
};
