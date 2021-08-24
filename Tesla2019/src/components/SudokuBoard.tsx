import React, { useState, ChangeEvent } from "react";

import { StyledTable, StyledData } from "./Elements";

import { sudokuBoard, sudokuString } from "../helpers/types";

const borderStyle = {
  border: "solid medium #000000"
};

type boardProps = {
  rawSudokuString: sudokuString;
  solvedSudokuBoard: sudokuBoard;
};

const SudokuBoard = ({
  rawSudokuString,
  solvedSudokuBoard = null
}: boardProps) => {
  const renderBoardRows = () => {
    const boardRows: JSX.Element[] = []; // All 9 rows and columns of a sudoku board
    let newUnitRow: JSX.Element[] = []; // A group of 3 rows
    let newRow: JSX.Element[] = []; // A single row
    // We use the default raw provided sudoku string to first generate the board
    let sudokuRenderString: sudokuString = rawSudokuString;

    // if we have a solved sudoku board, parse board to a sudoku string ans use it
    if (solvedSudokuBoard) {
      sudokuRenderString = solvedSudokuBoard.map(row => row.join("")).join("");
    }

    for (let i = 0; i <= 81; i++) {
      // if we are at the end of a row
      if (i % 9 === 0 && i !== 0) {
        newUnitRow.push(<tr key={`row${i}`}>{newRow}</tr>);
        // if we are also at the end of 3 collective rows
        if (i % 27 === 0 && i !== 0) {
          boardRows.push(
            <tbody key={`unitRow${i}`} style={borderStyle}>
              {newUnitRow}
            </tbody>
          );
          newUnitRow = [];
        }
        newRow = [];
      }
      if (i !== 81) {
        // replace all invalid and blank characters to display
        let currUnit = sudokuRenderString[i];
        if (currUnit && currUnit.search(/^[1-9]+$/) === -1) {
          currUnit = "";
        }

        // push the cell to our new row
        newRow.push(<StyledData key={`cell${i}`}>{currUnit}</StyledData>);
      }
    }

    return boardRows;
  };

  return (
    <StyledTable>
      <colgroup style={borderStyle}>
        <col />
        <col />
        <col />
      </colgroup>
      <colgroup style={borderStyle}>
        <col />
        <col />
        <col />
      </colgroup>
      <colgroup style={borderStyle}>
        <col />
        <col />
        <col />
      </colgroup>
      {renderBoardRows()}
    </StyledTable>
  );
};

export default SudokuBoard;
