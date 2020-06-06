import React from "react";
import { GridChildComponentProps, areEqual } from "react-window";
import Cell from "./Cell";
import "./GridCellContainer.css";

const GridCellContainer = (props: GridChildComponentProps) => (
  <div style={props.style}>
    <div className="cell">
      <Cell y={props.rowIndex} x={props.columnIndex} />
    </div>
  </div>
);

export default React.memo(GridCellContainer, areEqual);
