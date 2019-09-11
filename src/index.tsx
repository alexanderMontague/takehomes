import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { createGlobalStyle } from "styled-components";

import Home from "./components/Home";

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Raleway');
    font-family: 'Raleway', sans-serif;
    background: linear-gradient(to right, #2C5364, #203A43, #0F2027);
  }

  input {
    -webkit-appearance: none;
    font-family: 'Raleway', sans-serif;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <Home />
  </Provider>,
  document.getElementById("root")
);
