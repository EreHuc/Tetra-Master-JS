import { Id } from "../../models";

export const ADD_TILE_TO_HAND = "ADD_TILE_TO_HAND";

export function addTilesToHand(playerId: Id, tileIds: Id[]) {
  return {
    type: ADD_TILE_TO_HAND,
    payload: { playerId, tileIds },
  };
}
