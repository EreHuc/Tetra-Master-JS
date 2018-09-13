import * as React from "react";

import { TileType } from "../../board.constants";
import "./Board.css";

type CellProps = {
  tileType: TileType;
};

export const Cell: React.SFC<CellProps> = ({ tileType }) => (
  <div className="board-cell">{tileType}</div>
);
