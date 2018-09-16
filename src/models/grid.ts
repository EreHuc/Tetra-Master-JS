import { Id } from "./id";

export type Cell = {
  playerId?: Id;
  tileId?: Id;
};

export type Grid = Cell[][];
