import * as R from "ramda";

import { createSelector } from "reselect";
import { Id } from "../../models";
import { getPlayer } from "../players";
import { RootState } from "../root.reducer";
import { getRootState } from "../root.selectors";

const currentPlayerIdLens = R.lensPath(["turn", "currentPlayerId"]);

const getCurrentPlayerId = (rootState: RootState) =>
  R.view<RootState, Id>(currentPlayerIdLens)(rootState);

export const getCurrentPlayer = createSelector(
  [getRootState, getCurrentPlayerId],
  (rootState, currentPlayerId) =>
    currentPlayerId ? getPlayer(currentPlayerId)(rootState) : undefined,
);
