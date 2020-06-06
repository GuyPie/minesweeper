import { Board, Coordinate, Cell, CellStatus } from "../types";

export const coordinateToIndex = ({ x, y }: Coordinate, height: number) =>
  x * height + y;

const indexToCoordinate = (index: number, height: number) => ({
  x: Math.floor(index / height),
  y: index % height,
});

const getAdjacentIndexes = (
  { x, y }: Coordinate,
  width: number,
  height: number
) => {
  const adjacentCoordinates: Array<number> = [];

  for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, width - 1); i++) {
    for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, height - 1); j++) {
      if (i === x && j === y) {
        continue;
      }

      adjacentCoordinates.push(coordinateToIndex({ x: i, y: j }, height));
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
    const rand = Math.floor(Math.random() * width * height);
    mineIndexes.add(rand);
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const index = coordinateToIndex({ x, y }, height);
      board[index].isMine = mineIndexes.has(index);
      board[index].adjacentMinesCount = getAdjacentIndexes(
        { x, y },
        width,
        height
      ).filter((index) => mineIndexes.has(index)).length;
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
  const adjacentIndexes = new Set(
    getAdjacentIndexes(coordinate, width, height).filter(
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
        const currAdjacentIndexes = getAdjacentIndexes(
          indexToCoordinate(index, height),
          width,
          height
        );

        for (const currIndex of currAdjacentIndexes) {
          const cell = newBoard[currIndex];

          if (
            cell.status === CellStatus.Hidden ||
            cell.status === CellStatus.Visible
          ) {
            adjacentIndexes.add(currIndex);
          }
        }
      }
    }
  }

  return newBoard;
};