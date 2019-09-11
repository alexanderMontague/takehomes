import { sudokuBoard, sudokuCell, sudokuString } from "./types";

/**
 * @function: isValidSudokuString
 * - Validates if a given sudoku string is valid based on these rules:
 * - The sudoku string will be 81 characters long representing a 9x9 board with 81 cells
 * - Each row must have a permutation of the numbers 1-9 with no duplicates
 * - Each column must have a permutation of the numbers 1-9  with no duplicates
 * - Each unit (a grouping of 9 cells in a square) must have a permutation of the numbers 1-9 with no duplicates
 *
 * @param {sudokuString} sudokuString The sudoku string representing every cell in a sudoku board read left to right, top to bottom
 * @return {boolean} A boolean representing if the given sudoku string (board) is valid and potentially solveable
 */
export const isValidSudokuString = (sudokuString: sudokuString): boolean => {
  // set storage up to keep track of if a number has already been in each space
  const units: sudokuCell[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  const rows: sudokuCell[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  const columns: sudokuCell[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  let currRow = 0;
  let currCol = 0;
  while (currRow !== 9) {
    // grab current digit
    const digit = sudokuString[9 * currRow + currCol];

    // if the cell has a value we can check it
    if (digit !== "0") {
      // get current unit each cell is in
      const currUnit = Math.floor(currRow / 3) + Math.floor(currCol / 3) * 3;

      // if current digit has already been in a unit, a row or a column, the sudoku is invalid
      if (
        units[currUnit][digit] ||
        columns[currRow][digit] ||
        rows[currCol][digit]
      ) {
        return false;
      }

      // if the board is so far valid, mark the digit down in the unit, row and column
      units[currUnit][digit] = columns[currRow][digit] = rows[currCol][
        digit
      ] = true;
    }

    // advance the column each iteration and each row once we hit the end of the previous row
    currCol++;
    if (currCol % 9 === 0) {
      currRow++;
      currCol = 0;
    }
  }

  // if the board is valid at the end of checking every cell, return true!
  return true;
};

/**
 * @function: solveSudokuString
 * - Will utilize internal sudoku functions to attempt to solve a given sudoku string
 *
 * @param {sudokuString} sudokuString current incomplete sudoku string that will be solved
 * @return {Array} A solved sudoku board with the runtime taken to complete
 */
export const solveSudokuString = (
  sudokuString: sudokuString
): [sudokuBoard, number] => {
  CURR_DEPTH = 0;
  const sudokuBoard: sudokuBoard = [];

  // parse our sudoku string into its board equivalent
  let newRow: number[] = [];
  for (let i = 0; i <= 81; i++) {
    // create a new row after the previous runs out of space
    if (i % 9 === 0 && i !== 0) {
      sudokuBoard.push(newRow);
      newRow = [];
    }
    // push the cell into our current row
    if (i !== 81) {
      newRow.push(Number(sudokuString[i]));
    }
  }

  // attempt to solve sudoku string while monitoring performance
  const startTime = performance.now();
  _solveSudokuBoard(sudokuBoard);
  const endTime = performance.now();

  if (CURR_DEPTH > MAX_DEPTH) {
    return [null, -1];
  }

  // return solved sudoku
  return [sudokuBoard, endTime - startTime];
};

/**
 * @function: _isDigitValid
 * - Validates if a passed sudoku digit is valid for the current called cell location
 * - This is done by checking if the number already exists in a previous row, column or unit
 *
 * @param {sudokuBoard} sudokuBoard current sudoku board being checked
 * @param {number} row current row being searched from
 * @param {number} col current column being searched from
 * @param {number} searchDigit current digit we are looking for to see if it is valid for the given location
 * @return {boolean} A boolean representing if the given sudoku digit is valid for the current cell
 */
const _isDigitValid = (
  sudokuBoard: sudokuBoard,
  row: number,
  col: number,
  searchDigit: number
): boolean => {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const n = 3 * Math.floor(col / 3) + (i % 3);
    // check if the current digit is already in a previous row, column or unit
    if (
      sudokuBoard[row][i] == searchDigit ||
      sudokuBoard[i][col] == searchDigit ||
      sudokuBoard[m][n] == searchDigit
    ) {
      return false;
    }
  }
  return true;
};

// depth counter used to determine if a sudoku is too hard for this algorithm
// we don't want the user to wait all day and also blow their browser up
const MAX_DEPTH = 33000000; // works out to be about 30 seconds
let CURR_DEPTH = 0;

/**
 * @function: _solveSudokuBoard
 * - Attempts to solve and fill in an incomplete but valid sudoku board utilizing backtracking
 * - I did not create, or come up with this algorithm. I simply modified it to suit this use case!
 * - Algorithm retrieved from: https://www.geeksforgeeks.org/sudoku-backtracking-7/
 *
 * @param {sudokuBoard} sudokuBoard current sudoku board being solved - *** This will be Mutated! ***
 * @return {boolean} A boolean representing the progress of completion on the sudoku board being solved. Utilized recursively.
 */
const _solveSudokuBoard = (sudokuBoard: sudokuBoard): boolean | number => {
  // failsafe implemented to not melt a user's computer
  CURR_DEPTH++;
  if (CURR_DEPTH > MAX_DEPTH) {
    return;
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudokuBoard[i][j] == 0) {
        for (let k = 1; k <= 9; k++) {
          if (_isDigitValid(sudokuBoard, i, j, k)) {
            sudokuBoard[i][j] = k;
            if (_solveSudokuBoard(sudokuBoard)) {
              return true;
            } else {
              sudokuBoard[i][j] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
};

// bad
// 83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79

// easy
// 005000006070009020000500107804150000000803000000092805907006000030400010200000600

// hard
// 52...6.........7.13...........4..8..6......5...........418.........3..2...87.....

// impossible
// ....14....3....2...7..........9...3.6.1.............8.2.....1.4....5.6.....7.8...
