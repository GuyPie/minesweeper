import { State, Coordinate, Cell, CellStatus } from "../types";

export const getCellByCoordinate = (
  state: State,
  coordinate: Coordinate
): Cell => {
  return state.board[coordinate.x * state.height + coordinate.y];
};

export const getFlaggedCells = (state: State): Cell[] => {
  return state.board.filter((cell) => cell.status === CellStatus.Flagged);
};
