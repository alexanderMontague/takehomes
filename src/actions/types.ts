import { sudokuBoard, sudokuString } from "../helpers/types";

// REDUX TYPES
export const VALIDATED_SUDOKU_STRING = "VALIDATED_SUDOKU_STRING";
export const ADD_SUDOKU_PUZZLE = "ADD_SUDOKU_PUZZLE";
export const ADD_SUDOKU_PUZZLE_RESPONSE = "ADD_SUDOKU_PUZZLE_RESPONSE";

// shape of our state
export interface SudokuState {
  username: string | null;
  rawSudokuString: sudokuString;
  solvedSudokuBoard: sudokuBoard | null;
  solvedSudokuString: sudokuString | null;
  isValid: boolean;
  isComplete: boolean;
  timeTaken: number;
  message: string | null;
  data: object | null;
  error: boolean;
}

// payload shapes
export interface validatedSudokuPayload {
  rawSudokuString: sudokuString;
  isValid: boolean;
}
export interface addSudokuPayload {
  username: string;
  solvedSudokuBoard: sudokuBoard | null;
  solvedSudokuString: sudokuString | null;
  isComplete: boolean;
  timeTaken: number;
}
export interface sudokuResponsePayload {
  message: string;
  data: object;
  error: boolean;
}

// action type validations
interface ValidatedSudokuAction {
  type: typeof VALIDATED_SUDOKU_STRING;
  payload: validatedSudokuPayload;
}
interface AddSudokuPuzzle {
  type: typeof ADD_SUDOKU_PUZZLE;
  payload: addSudokuPayload;
}
interface AddSudokuPuzzleResponse {
  type: typeof ADD_SUDOKU_PUZZLE_RESPONSE;
  payload: sudokuResponsePayload;
}

export type SudokuActionTypes =
  | ValidatedSudokuAction
  | AddSudokuPuzzle
  | AddSudokuPuzzleResponse;
