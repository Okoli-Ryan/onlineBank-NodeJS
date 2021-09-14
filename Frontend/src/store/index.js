import { createStore, combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";

const store = createStore(
  combineReducers({
    authReducer,
  })
);

export default store;
