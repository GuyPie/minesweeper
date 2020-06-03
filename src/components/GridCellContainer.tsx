import React from "react";
import { GridChildComponentProps, areEqual } from "react-window";
import CellContainer from "./CellContainer";
import "./GridCellContainer.css";

const GridCellContainer = React.memo(
  (props: GridChildComponentProps) => (
    <div style={props.style}>
      <div className="cell">
        <CellContainer y={props.rowIndex} x={props.columnIndex} />
      </div>
    </div>
  ),
  areEqual
);

export default GridCellContainer;
