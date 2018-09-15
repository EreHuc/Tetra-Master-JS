import { Id } from "./id";

export type Player = {
  id: Id;
  name: string;
  hand: Id[];
  focusedTileId?: Id;
  selectedTileId?: Id;
};
