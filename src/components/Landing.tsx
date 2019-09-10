import React, { useState, ChangeEvent } from "react";

import { isValidSudokuString } from "../helpers/sudoku";

// using font awesome's react icon library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
// utilizing styled components, my fav CSS in JS library
import {
  StyledFlexBox,
  StyledText,
  StyledInput,
  StyledToolTip,
  StyledInfoWrapper,
  StyledButton
} from "./Elements";

const Landing = props => {
  const [sudokuString, setSudokuString] = useState(""); // where the sudoku string input is stored
  const [statusMessage, setStatusMessage] = useState(""); // status used to provide feedback to the user
  const [isInputValid, setIsInputValid] = useState(false); // used to signal a syntactically invalid sudoku string
  const [isSudokuValid, setIsSudokuValid] = useState(false); // used to signal a correct and valid sudoku string after it has been validated

  // some frontend validation to make the UX a bit better
  const inputValidator = (e: ChangeEvent<HTMLInputElement>) => {
    let newInput = e.target.value;

    // don't even let user enter spaces and provide most FE validation
    newInput = newInput.replace(/\s/g, "");
    if (newInput.search(/^[0-9\.]+$/) === -1 && newInput.length !== 0) {
      setStatusMessage("Only numbers and periods please!");
      setIsInputValid(false);
    } else if (newInput.length > 81) {
      // check max length here, but validate minimum on submit so user is not continuously facing a warning message
      setStatusMessage("The sudoku string must be exactly 81 characters long!");
      setIsInputValid(false);
    } else {
      setStatusMessage("");
      setIsInputValid(true);
    }

    // update our parsed input
    setSudokuString(newInput);
  };

  const validateSudoku = () => {
    // now validate min length
    if (sudokuString.length < 81) {
      setStatusMessage("The sudoku string must be exactly 81 characters long!");
      setIsInputValid(false);
      return;
    }

    // replace all periods with 0s before sending to validation function
    const parsedSudokuString = sudokuString.replace(/\./g, "0");
    const isValidSudoku = isValidSudokuString(parsedSudokuString);

    if (isValidSudoku) {
      setStatusMessage(
        "The sudoku string provided is valid! Would you like to attempt to solve the sudoku?"
      );
      setIsInputValid(true);
      setIsSudokuValid(true);
    } else {
      setStatusMessage(
        "The sudoku string provided is invalid! There are duplicate numbers in a unit, row or column."
      );
      setIsInputValid(false);
      setIsSudokuValid(false);
    }
  };

  return (
    <StyledFlexBox direction="column">
      <StyledText
        weight="600"
        size="30px"
        color="#FFFFFF"
        margin="30px 0 70px 0"
      >
        Tesla Sudoku Solver
      </StyledText>

      {/* Status Message Text to provide feedback */}
      <StyledText size="15px" color="#FFFFFF" margin="30px 0 10px 0">
        {statusMessage}
      </StyledText>

      <StyledFlexBox>
        <StyledInput
          type="text"
          placeholder="Enter a Sudoku String!"
          value={sudokuString}
          onChange={inputValidator}
          customStyles={{
            width: "380px",
            size: "15px",
            margin: "50px 0 20px 0"
          }}
        />
        <StyledInfoWrapper>
          {/* I assume the user will get most knowledge from the README, but a quick tooltip never hurts */}
          <StyledToolTip>
            A Sudoku string is an 81 character long string representing all
            sequential rows on a Sudoku board reading cells left to right.
            Numbers 1-9 are valid for each known cell and zero or a period can
            be used as a blank cell.
          </StyledToolTip>
          <FontAwesomeIcon icon={faQuestionCircle} color="#FFFFFF" size="2x" />
        </StyledInfoWrapper>
      </StyledFlexBox>
      {isSudokuValid ? (
        <StyledFlexBox>
          <StyledButton
            type="button"
            onClick={validateSudoku}
            customStyles={{
              width: "224px",
              margin: "50px 0"
            }}
          >
            Yes
          </StyledButton>
          <StyledButton
            type="button"
            onClick={validateSudoku}
            customStyles={{
              width: "224px",
              margin: "50px 0"
            }}
          >
            No
          </StyledButton>
        </StyledFlexBox>
      ) : (
        <StyledButton
          type="button"
          onClick={validateSudoku}
          disabled={!isInputValid}
          customStyles={{
            width: "450px",
            margin: "50px 0"
          }}
        >
          Validate Sudoku
        </StyledButton>
      )}
    </StyledFlexBox>
  );
};

export default Landing;

// bad
// 83..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79
