import * as React from "react";

import { Id } from "../../models";
import TileCard from "../TileCard";
import "./PlayerHand.css";

export type TileEventFn = (params: { tileId: Id }) => void;
type PlayerHandProps = {
  playerId: Id;
  tileIds: Id[];
  focusedTileId?: Id;
  selectedTileId?: Id;
  onTileMouseEnter: TileEventFn;
  onTileMouseLeave: TileEventFn;
  onTileClick: TileEventFn;
};

const handleTileMouseEvent = (tileId: Id, onEvent: TileEventFn) => () => {
  onEvent({ tileId });
};

export const PlayerHand = ({
  playerId,
  tileIds = [],
  focusedTileId,
  selectedTileId,
  onTileMouseEnter,
  onTileMouseLeave,
  onTileClick,
}: PlayerHandProps) => (
  <div className="player-hand">
    hand:&nbsp;
    {tileIds.length > 0 &&
      tileIds.map((tileId, index) => (
        <TileCard
          key={index}
          tileId={tileId}
          playerId={playerId}
          focused={tileId === focusedTileId}
          selected={tileId === selectedTileId}
          onMouseEnter={handleTileMouseEvent(tileId, onTileMouseEnter)}
          onMouseLeave={handleTileMouseEvent(tileId, onTileMouseLeave)}
          onClick={handleTileMouseEvent(tileId, onTileClick)}
        />
      ))}
  </div>
);
