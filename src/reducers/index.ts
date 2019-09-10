import { combineReducers } from "redux";
import userState from "./userReducer";

const rootReducer = combineReducers({
  userState
});

export default rootReducer;
