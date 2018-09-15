import * as R from "ramda";
import { combineReducers } from "redux";
import { v1 as uuidv1 } from "uuid";

import { Id, Player } from "../../models";
import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  FOCUS_HAND_TILE,
} from "./players.actions";

export type Players = {
  map: PlayerMap;
  all: Id[];
};

export type PlayerMap = { [key: string]: Player };

const addTilesToPlayerHandReducer = (
  playerMap: PlayerMap,
  payload: {
    playerId: Id;
    tileIds: Id[];
  },
): PlayerMap => {
  const { playerId, tileIds } = payload;

  const hand = [...playerMap[playerId].hand, ...tileIds];
  return R.assocPath([playerId, "hand"], hand, playerMap);
};

const addPlayerToMapReducer = (
  players: Players,
  payload: { player: Player },
): Players => {
  const { player } = payload;

  const fullPlayer = {
    ...{ id: uuidv1(), hand: [] },
    ...player,
  };
  const all = [...players.all, ...[fullPlayer.id]];

  // @ts-ignore
  return R.pipe(
    R.assocPath(["map", fullPlayer.id], fullPlayer),
    R.assocPath(["all"], all),
  )(players);
};

const setFocusedTileToPlayerHandReducer = (
  playerMap: PlayerMap,
  payload: { playerId: Id; tileId: Id },
) => {
  const { playerId, tileId } = payload;
  return R.assocPath([playerId, "focusedTile"], tileId, playerMap);
};

const mapReducer = (playerMap: PlayerMap = {}, action) => {
  switch (action.type) {
    case ADD_TILE_TO_HAND:
      return addTilesToPlayerHandReducer(playerMap, action.payload);
    case FOCUS_HAND_TILE:
      return setFocusedTileToPlayerHandReducer(playerMap, action.payload);
  }
  return playerMap;
};

const allReducer = (playerAll: Id[] = [], action) => {
  return playerAll;
};

const crossSliceReducer = (players: Players, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return addPlayerToMapReducer(players, action.payload);
  }
  return players;
};

const combinedReducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

export function playersReducer(state, action) {
  const intermediateState = combinedReducer(state, action);
  const finalState = crossSliceReducer(intermediateState, action);
  return finalState;
}
