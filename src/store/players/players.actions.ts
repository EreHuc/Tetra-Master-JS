import { Id, Player } from "../../models";

export const ADD_PLAYER = "ADD_PLAYER";
export const ADD_TILE_TO_HAND = "ADD_TILE_TO_HAND";
export const FOCUS_HAND_TILE = "FOCUS_HAND_TILE";

export function addPlayer(player: Partial<Player>) {
  return {
    type: ADD_PLAYER,
    payload: { player },
  };
}

export function addTilesToPlayerHand(playerId: Id, tileIds: Id[]) {
  return {
    type: ADD_TILE_TO_HAND,
    payload: { playerId, tileIds },
  };
}

export function focusHandTile(playerId: Id, tileId: Id) {
  return {
    type: FOCUS_HAND_TILE,
    payload: { playerId, tileId },
  };
}
