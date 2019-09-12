import { put, takeLatest, select } from "redux-saga/effects";
import { addSudokuToUser } from "../helpers/requests";
import {
  ADD_SUDOKU_PUZZLE,
  SudokuActionTypes,
  addSudokuPayload
} from "../actions/types";

// would normally use something like reselect
const getRawSudokuString = state => state.sudokuState.rawSudokuString;

// Add sudoku to user's profile when finished attempting the solve
function* storeSudokuResult({ payload }: SudokuActionTypes) {
  const originalSudokuString = yield select(getRawSudokuString);

  const response = yield addSudokuToUser({
    ...Object(payload),
    originalSudokuString
  });

  console.log("RES", response);
}

export function* sudokuSaga() {
  yield takeLatest(ADD_SUDOKU_PUZZLE, storeSudokuResult);
}
