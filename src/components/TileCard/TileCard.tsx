import * as React from "react";

import { Tile } from "../../models";
import "./TileCard.css";

type TileProps = {
  tile: Tile;
  focused?: boolean;
  selected?: boolean;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
};

export const TileCard: React.SFC<TileProps> = ({
  tile,
  selected,
  focused,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => (
  <button
    className={`tile-card tile-type-${tile.typeId} ${selected && "selected"}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {focused && `tile ${tile.id}`}
  </button>
);
