import * as R from "ramda";

import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";

// TODO: Use reselect for memoization

export const getAllPlayerIds = (rootState: RootState): Id[] => {
  return R.path<Id[]>(["players", "all"], rootState) || [];
};

export const getPlayer = (playerId: Id) => (
  rootState: RootState,
): Player | undefined => {
  return R.path(["players", "map", playerId])(rootState) || undefined;
};

export const getPlayerAtIndex = (index: number) => (rootState: RootState) => {
  const playerId = getPlayerIdAtIndex(index)(rootState);
  return playerId ? getPlayer(playerId)(rootState) : undefined;
};

export const getPlayerIdAtIndex = (index: number) => (rootState: RootState) => {
  return R.path<Id>(["players", "all", index], rootState) || undefined;
};

// TODO: Move to store/tiles
const tiles = [
  { id: "1", typeId: "1" },
  { id: "2", typeId: "2" },
  { id: "3", typeId: "4" },
  { id: "4", typeId: "4" },
  { id: "5", typeId: "3" },
  { id: "6", typeId: "2" },
];
export const getTile = (tileId: Id) => (rootState: RootState) => {
  return tiles.find(tile => tile.id === tileId);
};
