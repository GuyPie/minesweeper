import {
  State,
  Action,
  GameStatus,
  Cell,
  CellStatus,
  Coordinate,
  Board,
} from "../types";
import { revealClearAdjacentCells } from "../logic";
import { getCellByCoordinate, getFlaggedCells } from "../selectors";

const revealCell = ({
  board,
  coordinate,
  cell,
  width,
  height,
  mineCount,
}: {
  board: Board;
  coordinate: Coordinate;
  cell: Cell;
  width: number;
  height: number;
  mineCount: number;
}): [Board, GameStatus] => {
  if (cell.status !== CellStatus.Hidden && cell.status !== CellStatus.Visible) {
    return [board, GameStatus.InProgress];
  }

  let newBoard = [...board];
  newBoard[coordinate.x * height + coordinate.y] = {
    ...cell,
    status: CellStatus.Revealed,
  };

  if (cell.isMine) {
    return [newBoard, GameStatus.Lost];
  }

  if (!cell.adjacentMinesCount) {
    newBoard = revealClearAdjacentCells(newBoard, coordinate, width, height);
  }
  const nonRevealedCells = newBoard.filter(
    (cell) => cell.status !== CellStatus.Revealed
  );

  return [
    newBoard,
    nonRevealedCells.length === mineCount
      ? GameStatus.Won
      : GameStatus.InProgress,
  ];
};

const flagCell = ({
  board,
  flaggedCells,
  coordinate,
  cell,
  height,
  mineCount,
  isSuperman,
}: {
  board: Board;
  flaggedCells: Cell[];
  coordinate: Coordinate;
  cell: Cell;
  height: number;
  mineCount: number;
  isSuperman: boolean;
}): [Board, GameStatus] => {
  if (cell.status === CellStatus.Revealed) {
    return [board, GameStatus.InProgress];
  }

  const remainingFlags = mineCount - flaggedCells.length;
  const newBoard = [...board];
  newBoard[coordinate.x * height + coordinate.y] = {
    ...cell,
    status:
      cell.status === CellStatus.Hidden || cell.status === CellStatus.Visible
        ? CellStatus.Flagged
        : isSuperman
        ? CellStatus.Visible
        : CellStatus.Hidden,
  };

  if (
    cell.isMine &&
    remainingFlags === 1 &&
    !flaggedCells.find((cell) => !cell.isMine)
  ) {
    return [newBoard, GameStatus.Won];
  }

  return [newBoard, GameStatus.InProgress];
};

const minesweeperReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CELL_REVEAL": {
      if (state.status !== GameStatus.InProgress) {
        return state;
      }

      const cell = getCellByCoordinate(state, action.payload);
      const [board, status] = revealCell({
        ...state,
        cell,
        coordinate: action.payload,
      });

      return { ...state, board, status };
    }

    case "CELL_FLAG": {
      if (state.status !== GameStatus.InProgress) {
        return state;
      }

      const flaggedCells = getFlaggedCells(state);
      const cell = getCellByCoordinate(state, action.payload);
      const remainingFlags = state.mineCount - flaggedCells.length;

      if (!remainingFlags && cell.status !== CellStatus.Flagged) {
        return { ...state, showOutOfFlags: true };
      }

      const [board, status] = flagCell({
        ...state,
        flaggedCells,
        cell,
        coordinate: action.payload,
        isSuperman: !!state.isSuperman,
      });
      return { ...state, board, status };
    }

    case "NEW_GAME": {
      return action.payload;
    }

    case "HIDE_OUT_OF_FLAGS": {
      return { ...state, showOutOfFlags: false };
    }

    case "TOGGLE_SUPERMAN": {
      return {
        ...state,
        board: state.board.map((cell) => {
          if (action.payload) {
            if (cell.status === CellStatus.Hidden) {
              return { ...cell, status: CellStatus.Visible };
            }

            return cell;
          } else {
            if (cell.status === CellStatus.Visible) {
              return { ...cell, status: CellStatus.Hidden };
            }

            return cell;
          }
        }),
        isSuperman: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default minesweeperReducer;
