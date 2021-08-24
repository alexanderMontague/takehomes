import { combineReducers } from "redux";
import sudokuState from "./sudokuReducer";

const rootReducer = combineReducers({
  sudokuState
});

export default rootReducer;
