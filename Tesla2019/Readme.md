# 🚗 Tesla Sudoku Solver 🔋

_Alex Montague
W2020
September 12, 2019_

![TSS](https://imgur.com/YUj0onB.png)

Welcome to my README! Thanks for this awesome opportunity, I had a lot of fun creating this project. Regardless of the outcome, it has been a great learning experience! Before reading, feel free to take a look at this video I created demonstrating the features of my application! I thought a video was a little more personal and far more entertaining! [https://www.youtube.com/watch?v=eOpwYJusPnk](https://www.youtube.com/watch?v=eOpwYJusPnk)

(the video is unlisted)

### Disclaimer:

- I hope I interpreted the question correctly

- I took it as "Given an 81 character sudoku string, return whether it is valid"

- This would also work with a full filled out sudoku string, as it is based off of duplicate numbers in a row, column or unit

- Hopefully this is acceptable!

## Prerequisites

I will get into running the application as an end user vs. developer right after this section, but that assumes that all prerequisites and dependencies are installed. This is so we can get the whole experience!

- A UNIX based system

- `node.js` version >= `10.0.0`

- `yarn` (preferred and tested on) or `npm`

- `nodemon` installed globally (it is a dependency, just making sure!)

- MongoDB. Install with: `brew tap mongodb/brew` and then `brew install mongodb-community@4.2` if you have homebrew!

## Running as a User

Welcome, sudoku loving user to my sudoku application! To get started make sure you have all of the prerequisites met and the project downloaded + unzipped!

(As a sidenote, the best UX would be for this app to be hosted + deployed so the end user does not have to do any of this. If this were the case I would have gone with a heroku instance for the React and Node servers, along with a Mongo's cloud cluster. Dockerizing things and utilizing Kubernetes is also an attractive option)

**To Run The Application:**

- Navigate to the project directory with a terminal

- In the terminal, type `yarn` if using yarn or `npm i` if using npm

- Once everything is installed, type `yarn start` or `npm start`

- Thats it!

- Your browser should now open to `localhost:8080` and if it did not, go ahead and navigate there

**To Use The Application:**

- You should now see the sudoku solver interface

- You will have one input to enter your sudoku string, and another for your username

- A sudoku string is an 81 character string representing every row in a sudoku board

- Go ahead and type your sudoku string in manually, or paste one from somewhere

- Here are some great resources for [EASY](https://norvig.com/easy50.txt) and [HARD](http://magictour.free.fr/top95) sudoku strings

- You may enter any number 1-9 and 0 or "." (period) represents a blank cell

- Once happy with your string, click "Validate Sudoku" to first validate it. This will make sure it is syntactically correct.

- Once the string is valid, go ahead and click "Yes" to solve the sudoku!

## Running as a Developer

Hello fearless developer! Welcome to the application. Make sure you have met the prerequisites and lets dive in.

**To Run The Application:**

- clone the repository (I can give you GitHub access to the private repo) or `cd` into the project folder

- In the terminal, type `yarn` if using yarn or `npm i` if using npm

- Once everything is installed, type `yarn start` or `npm start`

- The `start` script is actually a combination of a few commands, so if for whatever reason it does not work, you can try to run things separately

- The script trys to start up our React frontend through webpack, node server with nodemon, and mongo all in one go!

- If things fail try running: - `yarn client` or `npm run client` then - `yarn server` or `npm run server` then - `mongod --config /usr/local/etc/mongod.conf` or edit the command to point to wherever your `mongod.conf` is located!

- I tested with a clean install on a few machines, so hopefully it won't get to this point!

**To Use The Application:**

- This is mostly the same as a regular user, so feel free to follow those instructions too

- **Access the Database:**

If you want to see into the data stored from our sudoku app, you can use some preset endpoints I created for easy use, or dive into Mongo. Navigate to `localhost:8081` to start.

This is an example user sudoku document:

```

{

user_created_on: "2019-09-12T20:03:21.429Z",

_id: "5d7aa7123c1d38d2edd8cde4",

user_name: "Alex",

sudokus:

[

{

puzzle_created: "2019-09-12T20:03:21.429Z",

_id: "5d7aa7123c1d38d2edd8cde5",

original_sudoku_string: "005000987040050001007000000200048000090100000600200000300600200000009070000000500",

solved_sudoku_String: "135426987846957321927381465213748659598163742674295813351674298482539176769812534",

is_complete: true,

time_taken: 63.815000001341105

},

{

puzzle_created: "2019-09-12T20:03:21.429Z",

_id: "5d7aa7cb3c1d38d2edd8cde6",

original_sudoku_string: "600302000040000010000000000702600000000000054300000000080150000000040200000000700",

solved_sudoku_String: "615382479943765812827491536752634198168279354394518627286157943579843261431926785",

is_complete: true,

time_taken: 1051.1350000160746

}

],

__v: 0

},

```

- To see every single record in our database navigate or send a GET to `localhost:8081/all_sudoku_users/`

- To see all records for a single user navigate or send a GET to `localhost:8081/sudoku_user/:user_name` where `:user_name` is the name of a user you used in the frontend app. `localhost:8081/sudoku_user/alex` would pull up all records for user alex

* One thing you can do differently if you want to see how the app works is dive into the code

* The app is structured with `src` holding our React code containing our Redux Actions, Sagas, Reducers and store. We also have our Components folder holding our reusable react components. I decided against the container + component structure for this small project.

* Outside of the `src` folder we have `server.ts` where our node/express server lives, our webpack config and our other config + package files.

* Frontend additions can be made mostly to `src/components/Home.tsx` and server changes can be made to `server.ts`

## Architecture

This app was built ontop of Typescript utilizing React/Redux + Sagas for the frontend, Node/Express for our server, and MongoDB for our database

**Frontend:**

- I went with a pretty typical React/Redux layout except built ontop of TypeScript

- This was new to me as I have never used TypeScript, but I really enjoyed it (for the most part). After some experience with a strongly typed language like Go, it was nice to have the types and know exactly what I was dealing with. I did not know enough to effectively implement a fully typed Redux lifecycle, but tried my best!

- Redux in general along with Sagas might have been a little overkill, but I did want to give that a go with TS. I also built the Redux structure out for scale so thats why I have a root Reducer and Saga even though we only have one state stream + saga.

**Backend:**

- I utilized the same javascript project for our server simply because of how small it was

- For a full scale back end application this should most definitely live by itself. I really just liked utilizing the same dependencies and having everything bundled together.

- I would normally go down the route of having our main server entry point, then refactoring our routes out into controllers and the business logic living in components. Also a pretty standard node setup.

- Overall though the server does exactly what I need it to for this use case!

- I also utilized mongoose as our ODM as it is what I have the most experience with.

**Database:**

- Not too much to say here, but MongoDB was the easiest to setup + bootstrap, and also works really well with this ecosystem.

- The MERN stack is something I have a lot of experience with, and I find it works really nicely especially when you have frontend devs doing some backend work as JS is consistent

- There are some drawbacks to using a document or non-relational styled DB, but again for this same they were non-existant! For large projects I would probably so with an SQL based DBMS like Postgres

## Time Taken

Overall this projet took me about 3 full work days. I would say the majority of the headaches came from trying to implement Typescript and getting Webpack + Node to play nicely. The base case was implemented using a trivial solution within an hour or two (you can see the code at `src/helpers/sudoku.ts:14`) and the full stack implementation took the rest of the time. I did have class inbetween all of this, so in total it was completed from Tuesday Sep. 10 - Thursday Sep. 12.

## Code

This readme should be bundled with the code as well, but I also have it hosted at `git@github.com:alexanderMontague/sudoku-solver.git` (you will need to give me an email for access) and a dropbox link hosting the code is here: [https://www.dropbox.com/s/vqavemtq3uo8jxy/Alex_Montague_Sudoku_Solver.zip?dl=0](https://www.dropbox.com/s/vqavemtq3uo8jxy/Alex_Montague_Sudoku_Solver.zip?dl=0)

Thanks so much for the opportunity!
