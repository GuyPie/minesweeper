import React, { useContext } from "react";
import { Coordinate, CellStatus } from "../types";
import { MinesweeperContext } from "../state";
import { getCellByCoordinate } from "../selectors";
import CellText from "./CellText";

const adjacentMinesCountName = (n: number) => {
  switch (n) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    case 7:
      return "seven";
    case 8:
      return "eight";
    default:
      return "";
  }
};

const Cell = (coordinate: Coordinate) => {
  const { state, dispatch } = useContext(MinesweeperContext);
  const cell = getCellByCoordinate(state, coordinate);
  const onClick = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch({ type: "CELL_REVEAL", payload: coordinate });
    } else {
      dispatch({ type: "CELL_FLAG", payload: coordinate });
    }
  };

  return (
    <div
      className={`cell-content ${CellStatus[
        cell.status
      ].toLowerCase()} ${adjacentMinesCountName(cell.adjacentMinesCount)}`}
      onClick={onClick}
    >
      <CellText cell={cell} />
    </div>
  );
};

export default Cell;
