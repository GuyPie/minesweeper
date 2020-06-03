import React from "react";
import { Cell as CellType, CellStatus } from "../types";
import "./Cell.css";

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

const CellText = ({ cell }: { cell: CellType }) => {
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

const Cell = ({
  cell,
  onClick,
}: {
  cell: CellType;
  onClick: (e: React.MouseEvent) => void;
}) => {
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
