import { State, Action, GameStatus, Cell, CellStatus, Board } from "../types";
import { revealClearAdjacentCells, coordinateToIndex } from "../logic";
import { getFlaggedCells } from "../selectors";

const revealCell = ({
  board,
  index,
  width,
  height,
  mineCount,
}: {
  board: Board;
  index: number;
  width: number;
  height: number;
  mineCount: number;
}): [Board, GameStatus] => {
  let newBoard = [...board];
  newBoard[index] = {
    ...newBoard[index],
    status: CellStatus.Revealed,
  };

  if (newBoard[index].isMine) {
    return [newBoard, GameStatus.Lost];
  }

  if (!newBoard[index].adjacentMinesCount) {
    newBoard = revealClearAdjacentCells(newBoard, index, width, height);
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
  index,
  flaggedCells,
  mineCount,
  isSuperman,
}: {
  board: Board;
  index: number;
  flaggedCells: Cell[];
  mineCount: number;
  isSuperman?: boolean;
}): [Board, GameStatus] => {
  const remainingFlags = mineCount - flaggedCells.length;
  const newBoard = [...board];
  newBoard[index] = {
    ...newBoard[index],
    status:
      newBoard[index].status === CellStatus.Flagged
        ? isSuperman
          ? CellStatus.Visible
          : CellStatus.Hidden
        : CellStatus.Flagged,
  };

  if (
    newBoard[index].isMine &&
    remainingFlags === 1 &&
    newBoard[index].status === CellStatus.Flagged &&
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

      const index = coordinateToIndex(action.payload, state.height);

      if (
        state.board[index].status !== CellStatus.Hidden &&
        state.board[index].status !== CellStatus.Visible
      ) {
        return state;
      }

      const [board, status] = revealCell({
        ...state,
        index,
      });

      return { ...state, board, status };
    }

    case "CELL_FLAG": {
      if (state.status !== GameStatus.InProgress) {
        return state;
      }

      const index = coordinateToIndex(action.payload, state.height);

      if (state.board[index].status === CellStatus.Revealed) {
        return state;
      }

      const flaggedCells = getFlaggedCells(state);
      const remainingFlags = state.mineCount - flaggedCells.length;

      if (!remainingFlags && state.board[index].status !== CellStatus.Flagged) {
        return { ...state, showOutOfFlags: true };
      }

      const [board, status] = flagCell({
        ...state,
        index,
        flaggedCells,
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
            return cell.status === CellStatus.Hidden
              ? { ...cell, status: CellStatus.Visible }
              : cell;
          } else {
            return cell.status === CellStatus.Visible
              ? { ...cell, status: CellStatus.Hidden }
              : cell;
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
