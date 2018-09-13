import { combineReducers } from "redux";
import { createSelector } from "reselect";

import update from "immutability-helper";
import { Id, Player } from "../../models";
import { RootState } from "../root.reducer";
import { ADD_TILE_TO_HAND } from "./players.actions";

export type Players = {
  map: PlayerMap;
  all: Id[];
};

type PlayerMap = { [key: string]: Player };

type AddTileToHandAction = {
  playerId: Id;
  tileIds: Id[];
};
const addTileToHand = (
  playerMap: PlayerMap,
  action: AddTileToHandAction,
): PlayerMap => {
  const { playerId, tileIds } = action;

  return update<any>(playerMap, {
    [playerId]: {
      hand: { $push: tileIds },
    },
  });
};

// TODO: Don't hardcode default state here, instead trigger actions.
const testPlayers = {
  "1": { id: "1", name: "Player 1", hand: [] },
  "2": { id: "2", name: "Player 2", hand: [] },
};
export const mapReducer = (playerMap: PlayerMap = testPlayers, action) => {
  switch (action.type) {
    case ADD_TILE_TO_HAND:
      return addTileToHand(playerMap, action.payload);
  }
  return playerMap;
};

// TODO: Don't hardcode default state here, instead trigger actions.
const testPlayerIds = ["1", "2"];
export const allReducer = (state: Id[] = testPlayerIds, action): Id[] => {
  return state;
};

export const playersReducer = combineReducers({
  map: mapReducer,
  all: allReducer,
});

// selectors
export const getPlayersState = (rootState: RootState) => rootState.players;
export const getPlayer = (playerId: Id) => playersState =>
  playersState.map[playerId];
export const getHand = (player: Player) => player.hand;

export const getPlayerHand = (playerId: Id) =>
  createSelector([getPlayersState], (players: Players) =>
    getHand(getPlayer(playerId)(players)),
  );
