import * as R from "ramda";

import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";

// TODO: Use reselect for memoization

const getHand = (player: Player) => player.hand || [];

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

export const getPlayerHand = (playerId: Id) => (rootState: RootState) => {
  const player = getPlayer(playerId)(rootState);
  return player ? getHand(player) : [];
};

export const getPlayerHandAtIndex = (index: number) => (
  rootState: RootState,
) => {
  const player = getPlayerAtIndex(index)(rootState);
  return player ? getHand(player) : [];
};

export const getPlayerIdAtIndex = (index: number) => (rootState: RootState) => {
  return R.path<Id>(["players", "all", index], rootState) || undefined;
};
