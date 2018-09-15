import * as R from "ramda";
import { combineReducers } from "redux";

import { Grid, Id, Vector2 } from "../../models";
import { INIT_BOARD, PLACE_TILE } from "./board.actions";

export type Board = { grid: Grid };

export const initBoardReducer = (action: { size: Vector2 }) => {
  const { size } = action;
  const newGrid = Array(size.x);

  for (let i = 0; i < newGrid.length; i += 1) {
    newGrid[i] = Array(size.y).fill(null);
  }

  return newGrid;
};

export const placeTileReducer = (action: { position: Vector2; tileId: Id }) => {
  const { position, tileId } = action;

  return R.assocPath([position.x, position.y], tileId);
};

const gridReducer = (grid: Grid = [], action): Grid => {
  switch (action.type) {
    case INIT_BOARD:
      return initBoardReducer(action.payload);
    case PLACE_TILE:
      return placeTileReducer(action.payload)(grid);
  }
  return grid;
};

export const boardReducer = combineReducers({
  grid: gridReducer,
});
