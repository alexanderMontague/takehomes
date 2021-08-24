// TS TYPES
// representing the sudoku board
export type sudokuBoard = number[][];

// representing a sudoku cell in the validation stage
export type sudokuCell = { [key: string]: boolean };

// representing a full sudoku string
export type sudokuString = string;

export interface sudokuRequestFormat {
  user_name: string;
  original_sudoku_string: string;
  solved_sudoku_String: string;
  is_complete: boolean;
  time_taken: number;
}

// EXPRESS SCHEMAS
// sudoku user schema
export interface sudokuDocument {
  _id: string;
  userName: string;
  user_created_on: Date;
  sudokus: sudokuPuzzle[];
}

// sudoku puzzle schema
export interface sudokuPuzzle {
  original_sudoku_string: string;
  solved_sudoku_String: string;
  is_complete: boolean;
  time_taken: number;
  puzzle_created: Date;
}
