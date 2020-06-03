import React, { useContext } from "react";
import { Coordinate } from "../types";
import { MinesweeperContext } from "../state";
import { getCellByCoordinate } from "../selectors";
import Cell from "./Cell";

const CellContainer = (coordinate: Coordinate) => {
  const { state, dispatch } = useContext(MinesweeperContext);
  const cell = getCellByCoordinate(state, coordinate);
  const onClick = (e: React.MouseEvent) => {
    if (!e.shiftKey) {
      dispatch({ type: "CELL_REVEAL", payload: coordinate });
    } else {
      dispatch({ type: "CELL_FLAG", payload: coordinate });
    }
  };

  return <Cell cell={cell} onClick={onClick} />;
};

export default CellContainer;
