import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";

import SudokuBoard from "./SudokuBoard";

import { validatedSudoku, solvedSudoku } from "../actions";
import { sudokuBoard, sudokuString } from "../helpers/types";
import { isValidSudokuString, solveSudokuString } from "../helpers/sudoku";

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
  StyledButton,
  LoadingSpinner
} from "./Elements";

interface sudokuState {
  rawSudokuString: sudokuString; // raw string input representing a sudoku string
  solvedSudokuBoard: sudokuBoard | null; // solved sudokuBoard in array format

  isRawInputValid: boolean; // used to signal a syntactically valid sudoku string from the raw input
  isSudokuStringValid: boolean; // used to signal a correct and valid sudoku string after the validation function
}

const Home = ({ validatedSudoku, solvedSudoku }) => {
  // state pertaining to sudoku logic
  const [sudokuState, setSudokuState] = useState<sudokuState>({
    rawSudokuString: "",
    solvedSudokuBoard: null,
    isRawInputValid: false,
    isSudokuStringValid: false
  });
  const [username, setUsername] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); // used to provide feedback to the user
  const [isLoading, setLoadingStatus] = useState(false);

  // some frontend validation to make the UX a bit better
  const inputValidator = (e: ChangeEvent<HTMLInputElement>) => {
    let rawSudokuString = e.target.value;
    let isRawInputValid = false;
    // end sudoku is not valid if we have to re-validate it
    setSudokuState({
      ...sudokuState,
      solvedSudokuBoard: null,
      isSudokuStringValid: false
    });

    // don't even let user enter spaces and provide most FE validation
    rawSudokuString = rawSudokuString.replace(/\s/g, "");
    if (
      rawSudokuString.search(/^[0-9\.]+$/) === -1 &&
      rawSudokuString.length !== 0
    ) {
      setStatusMessage("Only numbers and periods please!");
    } else if (rawSudokuString.length > 81) {
      // check max length here, but validate minimum on submit so user is not continuously facing a warning message
      setStatusMessage("The sudoku string must be exactly 81 characters long!");
    } else {
      setStatusMessage("");
      isRawInputValid = true;
    }

    // update our parsed input
    setSudokuState({
      ...sudokuState,
      rawSudokuString: rawSudokuString,
      isRawInputValid
    });
  };

  const validateSudokuHandler = () => {
    // now validate min length
    if (sudokuState.rawSudokuString.length < 81) {
      setStatusMessage("The sudoku string must be exactly 81 characters long!");
      setSudokuState({ ...sudokuState, isRawInputValid: false });
      return;
    }

    // replace all periods with 0s before sending to validation function
    const parsedSudokuString = sudokuState.rawSudokuString.replace(/\./g, "0");
    const isValidSudoku = isValidSudokuString(parsedSudokuString);

    if (isValidSudoku) {
      setStatusMessage(
        "The sudoku string provided is valid! Would you like to attempt to solve the sudoku?"
      );
      setSudokuState({
        ...sudokuState,
        rawSudokuString: parsedSudokuString,
        isRawInputValid: true,
        isSudokuStringValid: true
      });
      validatedSudoku({
        rawSudokuString: parsedSudokuString,
        isValid: true
      });
    } else {
      setStatusMessage(
        "The sudoku string provided is invalid! There are duplicate numbers in a unit, row or column."
      );
      setSudokuState({
        ...sudokuState,
        isRawInputValid: false,
        isSudokuStringValid: false
      });

      // action creator
      validatedSudoku({
        rawSudokuString: parsedSudokuString,
        isRawInputValid: false
      });
    }

    setLoadingStatus(false);
  };

  const solveSudokuHandler = () => {
    setLoadingStatus(true);

    // as the sudoku string is re-validated on every change, the string will be valid and we do not need to re-validate
    const [solvedSudokuBoard, calculationTime] = solveSudokuString(
      sudokuState.rawSudokuString
    );

    setSudokuState({ ...sudokuState, solvedSudokuBoard });

    if (solvedSudokuBoard === null) {
      setStatusMessage(
        "Unable to solve given sudoku string. It may be too difficult! Would you like to try again?"
      );
    } else {
      setStatusMessage("Successfully solved sudoku string!");
    }

    // dispatch solved sudoku action to save to DB
    solvedSudoku({
      username,
      solvedSudokuBoard,
      solvedSudokuString: solvedSudokuBoard
        ? solvedSudokuBoard.map(row => row.join("")).join("") // convert sudoku board to string
        : null,
      isComplete: !!solvedSudokuBoard,
      timeTaken: calculationTime
    });
    setLoadingStatus(false);
  };

  const renderButtons = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    } else if (sudokuState.solvedSudokuBoard) {
      return (
        <StyledButton
          type="button"
          onClick={() => {
            setSudokuState({
              ...sudokuState,
              solvedSudokuBoard: null,
              isSudokuStringValid: false
            });
            setStatusMessage("");
          }}
          customStyles={{ width: "224px" }}
        >
          Reset Board
        </StyledButton>
      );
    } else if (sudokuState.isSudokuStringValid) {
      return (
        <StyledFlexBox>
          <StyledButton
            type="button"
            onClick={() => {
              setLoadingStatus(true);
              setTimeout(() => solveSudokuHandler(), 0); // allow re-render so user can see loading and not "hang"
            }}
            customStyles={{ width: "224px" }}
          >
            Yes
          </StyledButton>
          <StyledButton
            type="button"
            onClick={() => {
              // reset sudoku string status when user does not want to solve
              setStatusMessage("");
              setSudokuState({ ...sudokuState, isSudokuStringValid: false });
            }}
            customStyles={{ width: "224px" }}
          >
            No
          </StyledButton>
        </StyledFlexBox>
      );
    }

    return (
      <StyledButton
        type="button"
        onClick={validateSudokuHandler}
        disabled={!sudokuState.isRawInputValid || !username}
        customStyles={{
          width: "450px",
          margin: "50px 0"
        }}
      >
        Validate Sudoku
      </StyledButton>
    );
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

      {
        <SudokuBoard
          rawSudokuString={sudokuState.rawSudokuString}
          solvedSudokuBoard={sudokuState.solvedSudokuBoard}
        />
      }

      <StyledFlexBox>
        <StyledInput
          type="text"
          placeholder="Enter a Sudoku String!"
          value={sudokuState.rawSudokuString}
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
            {/* text blobs like this should be localized in production! */}A
            Sudoku string is an 81 character long string representing all
            sequential rows on a Sudoku board reading cells left to right.
            Numbers 1-9 are valid for each known cell and zero or a period can
            be used as a blank cell.
          </StyledToolTip>
          <FontAwesomeIcon icon={faQuestionCircle} color="#FFFFFF" size="2x" />
        </StyledInfoWrapper>
      </StyledFlexBox>

      <StyledInput
        type="text"
        placeholder="Enter a Username!"
        value={username}
        onChange={e => setUsername(e.target.value)}
        customStyles={{
          width: "430px",
          size: "15px",
          margin: "10px 0 30px 0"
        }}
      />

      {renderButtons()}
    </StyledFlexBox>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = { validatedSudoku, solvedSudoku };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
