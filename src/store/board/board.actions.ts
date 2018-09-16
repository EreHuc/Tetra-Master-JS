import { Id, Vector2 } from "../../models";

export const INIT_BOARD = "INIT_BOARD";
export const PLACE_TILE = "PLACE_TILE";

export function initBoard(size: Vector2) {
  return {
    type: INIT_BOARD,
    payload: { size },
  };
}

export function placeTile(playerId: Id, tileId: Id, position: Vector2) {
  return {
    type: PLACE_TILE,
    payload: { playerId, tileId, position },
  };
}
