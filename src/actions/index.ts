import {
  VALIDATED_SUDOKU_STRING,
  ADD_SUDOKU_PUZZLE,
  ADD_SUDOKU_PUZZLE_RESPONSE,
  SudokuActionTypes,
  validatedSudokuPayload,
  addSudokuPayload,
  sudokuResponsePayload
} from "./types";

export const validatedSudoku = (
  payload: validatedSudokuPayload
): SudokuActionTypes => ({
  type: VALIDATED_SUDOKU_STRING,
  payload
});

export const solvedSudoku = (payload: addSudokuPayload): SudokuActionTypes => ({
  type: ADD_SUDOKU_PUZZLE,
  payload
});

export const addedSudoku = (
  payload: sudokuResponsePayload
): SudokuActionTypes => ({
  type: ADD_SUDOKU_PUZZLE_RESPONSE,
  payload
});
