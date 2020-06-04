import { Board, Coordinate, Cell, CellStatus } from "../types";

const getAdjacentCoordinates = (
  board: Board,
  { x, y }: Coordinate,
  width: number,
  height: number
) => {
  const adjacentCoordinates: Coordinate[] = [];

  for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, width - 1); i++) {
    for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, height - 1); j++) {
      if (i === x && j === y) {
        continue;
      }

      adjacentCoordinates.push({ x: i, y: j });
    }
  }

  return adjacentCoordinates;
};

export const initBoard = (
  width: number,
  height: number,
  mineCount: number,
  isSuperman?: boolean
) => {
  const initialCell: Cell = {
    status: isSuperman ? CellStatus.Visible : CellStatus.Hidden,
    isMine: false,
    adjacentMinesCount: 0,
  };

  const board: Board = new Array(width * height).fill(undefined).map(() => ({
    ...initialCell,
  }));

  const mineIndexes = new Set<number>();

  while (mineIndexes.size < mineCount) {
    let rand = Math.floor(Math.random() * width * height);
    mineIndexes.add(rand);
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = x * height + y;
      board[index].isMine = mineIndexes.has(index);
      board[index].adjacentMinesCount = getAdjacentCoordinates(
        board,
        { x, y },
        width,
        height
      ).filter((cell) => mineIndexes.has(cell.x * height + cell.y)).length;
    }
  }

  return board;
};

export const revealClearAdjacentCells = (
  board: Board,
  coordinate: Coordinate,
  width: number,
  height: number
) => {
  const newBoard = [...board];
  let adjacentCoordinates = getAdjacentCoordinates(
    board,
    coordinate,
    width,
    height
  ).filter((currCoordinate) => {
    const cell = board[currCoordinate.x * height + currCoordinate.y];
    return cell.status !== CellStatus.Revealed;
  });

  while (adjacentCoordinates.length) {
    const coordinate = adjacentCoordinates.shift()!;
    const cell = newBoard[coordinate.x * height + coordinate.y];

    if (
      cell.status === CellStatus.Hidden ||
      cell.status === CellStatus.Visible
    ) {
      newBoard[coordinate.x * height + coordinate.y] = {
        ...cell,
        status: CellStatus.Revealed,
      };

      if (!cell.adjacentMinesCount) {
        adjacentCoordinates.push(
          ...getAdjacentCoordinates(board, coordinate, width, height).filter(
            (currCoordinate) => {
              const cell = board[currCoordinate.x * height + currCoordinate.y];
              return (
                cell.status === CellStatus.Hidden ||
                cell.status === CellStatus.Visible
              );
            }
          )
        );
      }
    }
  }

  return newBoard;
};
