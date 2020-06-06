import { State, Coordinate, Cell, CellStatus } from "../types";
import { coordinateToIndex } from "../logic";

export const getCellByCoordinate = (
  state: State,
  coordinate: Coordinate
): Cell => {
  return state.board[coordinateToIndex(coordinate, state.height)];
};

export const getFlaggedCells = (state: State): Cell[] => {
  return state.board.filter((cell) => cell.status === CellStatus.Flagged);
};
