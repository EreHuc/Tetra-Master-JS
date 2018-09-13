import * as React from "react";
import { defaultProps } from "recompose";

import { Vector2 } from "../../Vector2";
import { Tile } from "../Tile";

type CellProps = {
  position: Vector2;
  tileId: string;
  onClick: (position: Vector2) => void;
};

const onClickWithPosition = (onClick, position) => clickEvent => {
  onClick(position);
};

export const Cell: React.SFC<CellProps> = ({ position, tileId, onClick }) => (
  <button
    className={"board-cell"}
    onClick={onClickWithPosition(onClick, position)}
  >
    {tileId && <Tile tileId={tileId} />}
  </button>
);

export const EnhancedCell = defaultProps({
  onClick: _ => {},
})(Cell);
