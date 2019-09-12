import { all } from "redux-saga/effects";
import { sudokuSaga } from "./sudoku";

export default function* rootSaga() {
  yield all([sudokuSaga()]);
}
