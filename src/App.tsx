import React, { useReducer } from "react";
import localforage from "localforage";
import { MinesweeperContext, minesweeperReducer } from "./state";
import { initBoard } from "./logic";
import Minesweeper from "./components/Minesweeper";
import { GameStatus, State } from "./types";

const width = 10;
const height = 10;
const mineCount = 10;

const initialState = {
  status: GameStatus.InProgress,
  board: initBoard(width, height, mineCount),
  width,
  height,
  mineCount,
};

function App({ persistedState }: { persistedState: State }) {
  const [state, dispatch] = useReducer(
    minesweeperReducer,
    persistedState || initialState
  );
  localforage.setItem("state", state);

  return (
    <MinesweeperContext.Provider value={{ state, dispatch }}>
      <Minesweeper />
    </MinesweeperContext.Provider>
  );
}

export default App;
