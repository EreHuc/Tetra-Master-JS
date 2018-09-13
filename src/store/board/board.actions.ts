import { Vector2 } from "../../Vector2";

export const INIT_BOARD = "INIT_BOARD";
export const PLACE_TILE = "PLACE_TILE";

export function initBoard(size: Vector2) {
  return {
    type: INIT_BOARD,
    payload: { size },
  };
}

export function placeTile(position: Vector2, tileId: string) {
  return {
    type: PLACE_TILE,
    payload: { position, tileId },
  };
}
