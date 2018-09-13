import * as React from "react";

import { Grid, Vector2 } from "../../models";
import { Cell } from "./Board.Cell";
import "./Board.css";

type BoardProps = {
  grid: Grid;
  onCellClick: (position: Vector2) => void;
};

export const Board: React.SFC<BoardProps> = ({ grid, onCellClick }) => (
  <div className="board">
    <div className="grid">
      {grid.map((row, x) =>
        row.map((cellId, y) => (
          <Cell
            key={`${x}-${y}`}
            tileId={cellId}
            position={new Vector2(x, y)}
            onClick={onCellClick}
          />
        )),
      )}
    </div>
  </div>
);
