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
