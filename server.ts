const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// types
const { sudokuDocument } = require("./src/helpers/types");

const port = 8081; // harcoded in front-end, don't change!
app.use(
  cors({
    origin: "http://localhost:8080"
  })
);

// MONGO CONFIG
const { connection: db, Schema } = mongoose;
// create sudoku schema
const SudokuSchema = new Schema({
  user_name: String,
  user_created_on: { type: Date, default: Date.now() },
  sudokus: [
    {
      original_sudoku_string: String,
      solved_sudoku_String: String,
      is_complete: Boolean,
      time_taken: Number,
      puzzle_created: { type: Date, default: Date.now() }
    }
  ]
});
// create sudoku model from schema
const SudokuModel = mongoose.model("sudokus", SudokuSchema);
// set up default mongoose connection
mongoose.connect("mongodb://127.0.0.1/sudoku_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// SERVER CONFIG
// start server
app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());

// would normally split routing logic out using controller + component method
// GET ROUTES
// list every single sudoku record
app.get("/sudoku_user/:user_name", async (req, res) => {
  console.log("GET to route /sudoku_user"); // would normally use some logging middleware
  const user_name = req.params.user_name;

  if (!user_name) {
    return res.status(400).json({
      code: 400,
      message: `Did you include a userName? Try /sudoku_user/<TEST_USER> where <TEST_USER> is a real username!`,
      data: null,
      error: true
    });
  }

  // attempt to find the username record requested
  await SudokuModel.find(
    { user_name },
    (err: Error, user: typeof sudokuDocument[]) => {
      // return if there is an error looking for the user
      if (err) {
        return res.status(500).json({
          code: 500,
          message: `Error Finding Document: ${err}`,
          data: null,
          error: true
        });
      }

      // if we find a user, grab the ID
      if (user.length === 0) {
        return res.status(400).json({
          code: 400,
          message: `Error Finding Document with username: ${user_name}`,
          data: null,
          error: true
        });
      } else {
        return res.json({
          code: 200,
          message: `Found user ${user_name}!`,
          data: user[0], // would also normally remove important info like the _id and __version
          error: false
        });
      }
    }
  );
});

// list all sudoku records for a certain naim
app.get("/all_sudoku_users", async (req, res) => {
  console.log("GET to route /all_sudoku_users");

  // attempt to find the username record requested
  await SudokuModel.find({}, (err: Error, users: typeof sudokuDocument[]) => {
    // return if there is an error looking for the user
    if (err) {
      return res.status(500).json({
        code: 500,
        message: `Error Finding Document: ${err}`,
        data: null,
        error: true
      });
    }

    return res.json({
      code: 200,
      message: `All users returned.`,
      data: users,
      error: false
    });
  });
});

// home
app.get("/", (req, res) => {
  console.log("GET to route /");
  return res.json({
    code: 200,
    message: `Tesla Sudoku Solver Server!`,
    data: null,
    error: false
  });
});

// POST ROUTES
app.post("/add_sudoku", async (req, res) => {
  console.log("POST to route /add_sudoku");
  const sudokuInfo = req.body.sudokuInfo;
  let userId = null;

  console.log("INFO", sudokuInfo);

  // attempt to find a username record to add puzzle to
  await SudokuModel.find(
    { user_name: sudokuInfo.username },
    (err: Error, user: typeof sudokuDocument[]) => {
      // return if there is an error looking for the user
      if (err) {
        return res.status(500).json({
          code: 500,
          message: `Error Finding Document: ${err}`,
          data: null,
          error: true
        });
      }

      // if we find a user, grab the ID
      if (user.length === 1) {
        userId = user[0]._id;
      }
    }
  );

  // create new puzzle coming from FE
  const newSudokuPuzzle = {
    original_sudoku_string: sudokuInfo.originalSudokuString,
    solved_sudoku_String: sudokuInfo.solvedSudokuString,
    is_complete: sudokuInfo.isComplete,
    time_taken: sudokuInfo.timeTaken
  };

  // if there is a user, add the puzzle to their document
  if (userId) {
    SudokuModel.findOneAndUpdate(
      { _id: userId },
      { $push: { sudokus: newSudokuPuzzle } },
      { useFindAndModify: true, new: true },
      (err, user) => {
        // if there is an error saving the document
        if (err) {
          return res.status(500).json({
            code: 500,
            message: `Error Updating Document: ${err}`,
            data: null,
            error: true
          });
        }

        console.log("HERE", user, "ERR", err);

        return res.json({
          code: 200,
          message: "Successfully added sudoku!",
          data: user,
          error: false
        });
      }
    );
  } else {
    // if there is no user, create the user
    const newSudoku = new SudokuModel({
      user_name: sudokuInfo.username,
      sudokus: [newSudokuPuzzle]
    });

    // save the new user and their puzzle to mongo
    newSudoku.save((err: Error, newSudokuDoc: typeof sudokuDocument) => {
      // if there is an error saving the document
      if (err) {
        return res.status(500).json({
          code: 500,
          message: `Error Saving New Document: ${err}`,
          data: null,
          error: true
        });
      }

      return res.json({
        code: 200,
        message: "Successfully created sudoku!",
        data: { newSudokuDoc },
        error: false
      });
    });
  }
});
