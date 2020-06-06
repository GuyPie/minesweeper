import React from "react";
import { Cell, CellStatus } from "../types";
import "./CellText.css";

const CellText = ({ cell }: { cell: Cell }) => {
  if (
    cell.status === CellStatus.Revealed ||
    cell.status === CellStatus.Visible
  ) {
    if (cell.isMine) {
      return <i className="material-icons bomb">new_releases</i>;
    }

    return <span>{cell.adjacentMinesCount || ""}</span>;
  }

  if (cell.status === CellStatus.Flagged) {
    return <i className="material-icons flag">tour</i>;
  }

  return <span></span>;
};

export default CellText;
