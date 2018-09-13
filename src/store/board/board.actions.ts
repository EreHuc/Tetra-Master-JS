import { Id, Vector2 } from "../../models";

export const INIT_BOARD = "INIT_BOARD";
export const PLACE_TILE = "PLACE_TILE";

export type PlaceTileAction = { position: Vector2; tileId: Id };
export type InitBoardAction = { size: Vector2 };

export function initBoard(size: Vector2) {
  return {
    type: INIT_BOARD,
    payload: { size },
  };
}

export function placeTile(position: Vector2, tileId: Id) {
  return {
    type: PLACE_TILE,
    payload: { position, tileId },
  };
}
