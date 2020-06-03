import React, { useReducer } from "react";
import { MinesweeperContext, minesweeperReducer } from "./state";
import { initBoard } from "./logic";
import Minesweeper from "./components/Minesweeper";
import { State, GameStatus } from "./types";

const width = 10;
const height = 10;
const mineCount = 10;

const stateString = localStorage.getItem("state");
const initialState: State = stateString
  ? (JSON.parse(stateString) as State)
  : {
      status: GameStatus.InProgress,
      board: initBoard(width, height, mineCount),
      width,
      height,
      mineCount,
    };

function App() {
  const [state, dispatch] = useReducer(minesweeperReducer, initialState);
  localStorage.setItem("state", JSON.stringify(state));

  return (
    <MinesweeperContext.Provider value={{ state, dispatch }}>
      <Minesweeper />
    </MinesweeperContext.Provider>
  );
}

export default App;
