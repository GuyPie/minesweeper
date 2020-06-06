import React from "react";
import ReactDOM from "react-dom";
import localforage from "localforage";
import { State } from "./types";
import App from "./App";
import "./index.css";

const init = async () => {
  const persistedState: State = await localforage.getItem("state");

  ReactDOM.render(
    <React.StrictMode>
      <App persistedState={persistedState} />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

init();
