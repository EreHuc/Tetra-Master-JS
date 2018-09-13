import * as React from "react";

import { Vector2 } from "../../Vector2";
import { Cell } from "./Board.Cell";
import "./Board.css";

type BoardProps = {
  board: string[][];
  onCellClick: (position: Vector2) => void;
};

export const Board: React.SFC<BoardProps> = ({ board, onCellClick }) => (
  <div className="board">
    <div className="grid">
      {board.map((row, x) =>
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
