import * as React from "react";

import { Tile } from "../Tile";
import "./PlayerHand.css";

export const PlayerHand = ({ tiles = [] }) => (
  <div className="player-hand">
    {tiles.length &&
      tiles.map((tileId, index) => <Tile key={index} tileId={tileId} />)}
  </div>
);
