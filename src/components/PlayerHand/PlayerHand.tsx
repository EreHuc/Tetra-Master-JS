import * as React from "react";

import { Id } from "../../models";
import { Tile } from "../Tile";
import "./PlayerHand.css";

type PlayerHandProps = {
  tiles: Id[];
};

export const PlayerHand = ({ tiles = [] }: PlayerHandProps) => (
  <div className="player-hand">
    {tiles.length > 0 &&
      tiles.map((tileId, index) => <Tile key={index} tileId={tileId} />)}
  </div>
);
