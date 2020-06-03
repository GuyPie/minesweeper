export enum CellStatus {
  Hidden,
  Revealed,
  Flagged,
  Visible,
}

export enum GameStatus {
  InProgress,
  Won,
  Lost,
}

export type Cell = {
  status: CellStatus;
  isMine: boolean;
  adjacentMinesCount: number;
};

export type Coordinate = {
  x: number;
  y: number;
};

export type Board = Array<Cell>;

export type State = {
  status: GameStatus;
  board: Board;
  width: number;
  height: number;
  mineCount: number;
  showOutOfFlags?: boolean;
  isSuperman?: boolean;
};

export type Action =
  | { type: "CELL_REVEAL"; payload: Coordinate }
  | { type: "CELL_FLAG"; payload: Coordinate }
  | { type: "NEW_GAME"; payload: State }
  | { type: "HIDE_OUT_OF_FLAGS" }
  | { type: "TOGGLE_SUPERMAN"; payload: boolean };

export type Context = {
  state: State;
  dispatch: React.Dispatch<Action>;
};
