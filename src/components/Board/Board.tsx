import * as React from "react";

import { Cell } from "./Board.Cell";
import "./Board.css";

export const Board = ({ board }) => (
  <div className="board">
    {board.map((row, x) =>
      row.map((tileType, y) => <Cell key={`${x}-${y}`} tileType={tileType} />),
    )}
  </div>
);
