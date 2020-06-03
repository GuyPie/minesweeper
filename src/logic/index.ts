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

  const availableCoordinates = new Array<Coordinate>(width * height);

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      availableCoordinates[x * height + y] = { x, y };
    }
  }

  for (let i = 0; i < mineCount; i++) {
    const rand = Math.floor(Math.random() * availableCoordinates.length);
    const { x, y } = availableCoordinates.splice(rand, 1)[0];
    board[x * height + y].isMine = true;
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      board[x * height + y].adjacentMinesCount = getAdjacentCoordinates(
        board,
        { x, y },
        width,
        height
      ).filter((cell) => board[cell.x * height + cell.y].isMine).length;
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

  while (true) {
    const coordinate = adjacentCoordinates.shift();

    if (!coordinate) {
      return newBoard;
    }

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
        adjacentCoordinates = adjacentCoordinates.concat(
          getAdjacentCoordinates(board, coordinate, width, height).filter(
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
};
