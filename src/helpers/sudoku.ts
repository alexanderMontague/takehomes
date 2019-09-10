/**
 * @function: isValidSudokuString
 * - Validates if a given sudoku string is valid based on these rules:
 * - The sudoku string will be 81 characters long representing a 9x9 board with 81 cells
 * - Each row must have a permutation of the numbers 1-9 with no duplicates
 * - Each column must have a permutation of the numbers 1-9  with no duplicates
 * - Each unit (a grouping of 9 cells in a square) must have a permutation of the numbers 1-9 with no duplicates
 *
 * @param {String} sudokuString The sudoku string representing every cell in a sudoku board read left to right, top to bottom
 * @return {Boolean} A boolean representing if the given sudoku string (board) is valid and potentially solveable
 */
export const isValidSudokuString = (sudokuString: string): boolean => {
  // set storage up to keep track of if a number has already been in each space
  type sudokuCell = { [key: string]: boolean };
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
