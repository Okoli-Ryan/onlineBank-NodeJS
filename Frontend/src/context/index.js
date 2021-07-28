import { createContext } from "react";

export const UserContext = createContext();

const initState = {};

export const reducer = (state, action) => {
  switch (action) {
    case "update_user":
      return { ...state, ...action.payload };
    case "logout":
      return initState;
    default:
      return state;
  }
};
