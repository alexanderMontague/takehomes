import axios from "axios";

export const addSudokuToUser = async sudokuInfo => {
  return (await axios.post("http://localhost:8081/add_sudoku", {
    sudokuInfo
  })).data;
};
