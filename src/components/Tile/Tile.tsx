import * as React from "react";

import "./Tile.css";

type TileProps = {
  tileId: string;
};

export const Tile: React.SFC<TileProps> = ({ tileId }) => (
  <div className={`tile tile-${tileId}`}>{tileId}</div>
);
