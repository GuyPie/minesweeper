import React, { useContext } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import { MinesweeperContext } from "../state";
import GridCellContainer from "./GridCellContainer";

const Grid = () => {
  const { state } = useContext(MinesweeperContext);

  return (
    <AutoSizer>
      {({ height: containerHeight, width: containerWidth }) => {
        return (
          <FixedSizeGrid
            className="minesweeper-grid"
            columnCount={state.width}
            columnWidth={50}
            height={containerHeight}
            rowCount={state.height}
            rowHeight={50}
            width={containerWidth}
          >
            {GridCellContainer}
          </FixedSizeGrid>
        );
      }}
    </AutoSizer>
  );
};

export default Grid;
