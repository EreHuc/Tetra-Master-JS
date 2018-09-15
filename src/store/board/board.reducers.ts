import update from "immutability-helper";
import { combineReducers } from "redux";

import { Grid, Id, Vector2 } from "../../models";
import { INIT_BOARD, PLACE_TILE } from "./board.actions";

export type Board = { grid: Grid };

export const initBoardReducer = (
  grid: Grid,
  action: { size: Vector2 },
): Grid => {
  const { size } = action;
  const newGrid = Array(size.x);

  for (let i = 0; i < newGrid.length; i += 1) {
    newGrid[i] = Array(size.y).fill(null);
  }

  return newGrid;
};

export const placeTileReducer = (
  grid: Grid,
  action: { position: Vector2; tileId: Id },
): Grid => {
  const { position, tileId } = action;

  return update(grid, {
    [position.x]: {
      [position.y]: { $set: tileId },
    },
  });
};

const gridReducer = (state: Grid = [], action): Grid => {
  switch (action.type) {
    case INIT_BOARD:
      return initBoardReducer(state, action.payload);
    case PLACE_TILE:
      return placeTileReducer(state, action.payload);
  }
  return state;
};

export const boardReducer = combineReducers({
  grid: gridReducer,
});
