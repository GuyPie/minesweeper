import { Board, Coordinate, CellStatus } from "../types";

export const coordinateToIndex = ({ x, y }: Coordinate, height: number) =>
  x * height + y;

const getIndexAdjacentIndexes = (
  index: number,
  width: number,
  height: number
) => {
  return getCoordinateAdjacentIndexes(
    { x: Math.floor(index / height), y: index % height },
    width,
    height
  );
};

const getCoordinateAdjacentIndexes = (
  { x, y }: Coordinate,
  width: number,
  height: number
) => {
  const adjacentIndexes: Array<number> = [];

  for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, width - 1); i++) {
    for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, height - 1); j++) {
      if (i === x && j === y) {
        continue;
      }

      adjacentIndexes.push(coordinateToIndex({ x: i, y: j }, height));
    }
  }

  return adjacentIndexes;
};

export const initBoard = (
  width: number,
  height: number,
  mineCount: number,
  isSuperman?: boolean
) => {
  const board: Board = new Array(width * height);
  const mineIndexes = new Set<number>();

  while (mineIndexes.size < mineCount) {
    const rand = Math.floor(Math.random() * width * height);
    mineIndexes.add(rand);
  }

  for (let i = 0; i < width * height; i++) {
    board[i] = {
      status: isSuperman ? CellStatus.Visible : CellStatus.Hidden,
      isMine: mineIndexes.has(i),
      adjacentMinesCount: getIndexAdjacentIndexes(
        i,
        width,
        height
      ).filter((index) => mineIndexes.has(index)).length,
    };
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
  const adjacentIndexes = new Set(
    getCoordinateAdjacentIndexes(coordinate, width, height).filter(
      (index) => board[index].status !== CellStatus.Revealed
    )
  );

  for (const index of adjacentIndexes) {
    const cell = newBoard[index];

    if (
      cell.status === CellStatus.Hidden ||
      cell.status === CellStatus.Visible
    ) {
      newBoard[index] = {
        ...cell,
        status: CellStatus.Revealed,
      };

      if (!cell.adjacentMinesCount) {
        const currAdjacentIndexes = getIndexAdjacentIndexes(
          index,
          width,
          height
        );

        for (const currIndex of currAdjacentIndexes) {
          adjacentIndexes.add(currIndex);
        }
      }
    }
  }

  return newBoard;
};
