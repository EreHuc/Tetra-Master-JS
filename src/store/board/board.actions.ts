import { Id, Vector2 } from "../../models";
import { getCurrentPlayer } from "../turn";

export const INIT_BOARD = "INIT_BOARD";
export const PLACE_TILE = "PLACE_TILE";

export const initBoard = (size: Vector2) => ({
  type: INIT_BOARD,
  payload: { size },
});

export const placeTile = (playerId: Id, tileId: Id, position: Vector2) => ({
  type: PLACE_TILE,
  payload: { playerId, tileId, position },
});

export const placeCurrentPlayerTile = (position: Vector2) => (
  dispatch,
  getState,
) => {
  const player = getCurrentPlayer(getState());
  // TODO: Dispatch only if the player can place a tile.
  // TODO: Dispatch only if the player has selected a tile.
  dispatch(placeTile(player.id, player.selectedTileId, position));
};
