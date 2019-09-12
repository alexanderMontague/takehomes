import {
  SudokuState,
  SudokuActionTypes,
  VALIDATED_SUDOKU_STRING,
  ADD_SUDOKU_PUZZLE,
  ADD_SUDOKU_PUZZLE_RESPONSE
} from "../actions/types";

const initialState: SudokuState = {
  username: null,
  rawSudokuString: null,
  solvedSudokuBoard: [],
  solvedSudokuString: null,
  isValid: false,
  isComplete: false,
  timeTaken: 0,
  message: null,
  data: null,
  error: false
};

// would normally split this state up into things like auth, UI, sudoku
const sudokuReducer = (prevState = initialState, action: SudokuActionTypes) => {
  switch (action.type) {
    case VALIDATED_SUDOKU_STRING:
      return {
        ...prevState,
        rawSudokuString: action.payload.rawSudokuString,
        isValid: action.payload.isValid
      };

    case ADD_SUDOKU_PUZZLE:
      return {
        ...prevState,
        username: action.payload.username,
        solvedSudokuBoard: action.payload.solvedSudokuBoard,
        solvedSudokuString: action.payload.solvedSudokuString,
        isComplete: action.payload.isComplete,
        timeTaken: action.payload.timeTaken
      };

    case ADD_SUDOKU_PUZZLE_RESPONSE:
      return {
        ...prevState
      };

    default:
      return prevState;
  }
};

export default sudokuReducer;
