import * as R from "ramda";

import { createSelector } from "reselect";
import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";
import { getRootState } from "../root.selectors";

// TODO: Use reselect for memoization

const playersLens = R.lensPath(["players"]);
const allLens = R.lensPath(["all"]);
const mapLens = R.lensPath(["map"]);

const allPlayerIdsLens = R.compose(
  playersLens,
  allLens,
);
const playerIdAtIndexLens = (index: number) =>
  R.compose(
    playersLens,
    allLens,
    R.lensIndex(index),
  );
const playerLens = (playerId: Id) =>
  R.compose(
    playersLens,
    mapLens,
    R.lensProp(playerId),
  );

export const getAllPlayerIds = (rootState: RootState) => {
  // @ts-ignore
  return R.view<RootState, Id[]>(allPlayerIdsLens, rootState) || [];
};

export const getPlayer = (playerId: Id) => (rootState: RootState) => {
  return (
    // @ts-ignore
    R.view<RootState, Player>(playerLens(playerId), rootState) || undefined
  );
};

export const getPlayerAtIndex = (index: number) =>
  createSelector(
    [getRootState, getPlayerIdAtIndex(index)],
    (rootState, playerId) => getPlayer(playerId)(rootState),
  );

export const getPlayerIdAtIndex = (index: number) => (rootState: RootState) => {
  return (
    // @ts-ignore
    R.view<RootState, Id>(playerIdAtIndexLens(index), rootState) || undefined
  );
};
