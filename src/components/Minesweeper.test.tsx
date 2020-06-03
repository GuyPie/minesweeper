import React from "react";
import { render } from "@testing-library/react";
import { MinesweeperContext, emptyContext } from "../state";
import { GameStatus } from "../types";
import Minesweeper from "./Minesweeper";

test("show remaining flags with initial mines number", () => {
  const { getByText } = render(
    <MinesweeperContext.Provider value={emptyContext}>
      <Minesweeper />
    </MinesweeperContext.Provider>
  );
  const flagsLeftElement = getByText(
    new RegExp(`Flags left: ${emptyContext.state.mineCount}`)
  );
  expect(flagsLeftElement).toBeInTheDocument();
});

test("does not show confetti when game is not won", () => {
  const { queryByTestId } = render(
    <MinesweeperContext.Provider value={emptyContext}>
      <Minesweeper />
    </MinesweeperContext.Provider>
  );
  expect(queryByTestId("confetti")).toBeNull();
});

test("show confetti on win", () => {
  const { getByTestId } = render(
    <MinesweeperContext.Provider
      value={{
        dispatch: emptyContext.dispatch,
        state: {
          ...emptyContext.state,
          status: GameStatus.Won,
        },
      }}
    >
      <Minesweeper />
    </MinesweeperContext.Provider>
  );
  const confettiElement = getByTestId("confetti");
  expect(confettiElement).toBeInTheDocument();
});
