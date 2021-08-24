import { takeLatest, select, put } from "redux-saga/effects";
import { addSudokuToUser } from "../helpers/requests";
import { addedSudoku } from "../actions";
import {
  ADD_SUDOKU_PUZZLE,
  SudokuActionTypes,
  sudokuResponsePayload
} from "../actions/types";

// would normally use something like reselect
const getRawSudokuString = state => state.sudokuState.rawSudokuString;

// Add sudoku to user's profile when finished attempting the solve
function* storeSudokuResult({ payload }: SudokuActionTypes) {
  const originalSudokuString = yield select(getRawSudokuString);

  const response: sudokuResponsePayload = yield addSudokuToUser({
    ...payload,
    originalSudokuString
  });

  // print and dispatch the request response
  console.log("RES", response);
  yield put(addedSudoku(response));
}

export function* sudokuSaga() {
  yield takeLatest(ADD_SUDOKU_PUZZLE, storeSudokuResult);
}
