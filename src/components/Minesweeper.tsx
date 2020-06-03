import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "./Grid";
import Confetti from "./Confetti";
import GameOverDialog from "./GameOverDialog";
import OutOfFlagsDialog from "./OutOfFlagsDialog";
import Configuration from "./Configuration";
import { getFlaggedCells } from "../selectors";
import { MinesweeperContext } from "../state";
import { GameStatus } from "../types";
import { initBoard } from "../logic";
import "./Minesweeper.css";

const Minesweeper = () => {
  const { state, dispatch } = useContext(MinesweeperContext);
  const flagsLeft = state.mineCount - getFlaggedCells(state).length;

  return (
    <div className="minesweeper-container">
      {state.status === GameStatus.Won && <Confetti />}
      <Configuration
        newGame={(width, height, mineCount) =>
          dispatch({
            type: "NEW_GAME",
            payload: {
              status: GameStatus.InProgress,
              width,
              height,
              mineCount,
              board: initBoard(width, height, mineCount, state.isSuperman),
              isSuperman: state.isSuperman,
            },
          })
        }
      />
      <OutOfFlagsDialog
        open={!!state.showOutOfFlags}
        onClose={() => dispatch({ type: "HIDE_OUT_OF_FLAGS" })}
      />
      <GameOverDialog
        status={state.status}
        onClose={() =>
          dispatch({
            type: "NEW_GAME",
            payload: {
              ...state,
              status: GameStatus.InProgress,
              board: initBoard(
                state.width,
                state.height,
                state.mineCount,
                state.isSuperman
              ),
            },
          })
        }
      />
      <Typography gutterBottom>Flags left: {flagsLeft}</Typography>
      <div className="grid-container">
        <Grid />
      </div>
    </div>
  );
};

export default Minesweeper;
