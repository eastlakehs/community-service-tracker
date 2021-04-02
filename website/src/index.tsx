import React from "react";
import ReactDOM from "react-dom";
import "./styles/tailwind.out.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Load error logging async to not affect page load time
import("./errorLogging")
  .then((module) => module.initErrorLogging())
  .catch((_e) => {
    // don't care if error logging fails to load
  });

ReactDOM.render(<App />, document.getElementById("root"));

// Strict mode is unfortuanately not used due to a reliance on the react-helmet which has not yet
// made their code strict-safe.

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
