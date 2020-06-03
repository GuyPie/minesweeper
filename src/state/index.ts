import React from "react";
import { Context, GameStatus } from "../types";
import origMinesweeperReducer from "./reducer";

export const emptyContext: Context = {
  state: {
    status: GameStatus.InProgress,
    board: [],
    width: 1,
    height: 2,
    mineCount: 3,
  },
  dispatch: () => {},
};
export const MinesweeperContext = React.createContext<Context>(emptyContext);
export const minesweeperReducer = origMinesweeperReducer;
