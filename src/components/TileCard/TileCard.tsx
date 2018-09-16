import * as React from "react";

import { Player, Tile } from "../../models";
import "./TileCard.css";

type TileProps = {
  tile: Tile;
  player: Player;
  focused?: boolean;
  selected?: boolean;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
  onClick?: React.MouseEventHandler;
};

export const TileCard: React.SFC<TileProps> = ({
  tile,
  player,
  selected,
  focused,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => (
  <button
    className={`tile-card tile-type-${tile.typeId} ${selected &&
      "selected"} player-${player.id}`}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    {focused && `tile ${tile.id}`}
  </button>
);
