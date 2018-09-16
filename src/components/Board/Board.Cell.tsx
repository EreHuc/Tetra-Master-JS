import * as React from "react";
import { defaultProps } from "recompose";

import { Cell, Vector2 } from "../../models";
import TileCard from "../TileCard";

type CellProps = {
  position: Vector2;
  cell: Cell;
  onClick: (position: Vector2) => void;
};

const onClickWithPosition = (onClick, position) => clickEvent => {
  onClick(position);
};

const BoardCell: React.SFC<CellProps> = ({ position, cell, onClick }) => (
  <div
    className="board-cell"
    role="button"
    onClick={onClickWithPosition(onClick, position)}
  >
    {cell.tileId && <TileCard tileId={cell.tileId} />}
  </div>
);

export const EnhancedBoardCell = defaultProps({
  onClick: _ => {},
})(BoardCell);
