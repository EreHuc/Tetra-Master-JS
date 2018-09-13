import update from "immutability-helper";
import { combineReducers } from "redux";

import { INIT_BOARD, PLACE_TILE } from "./board.actions";

type Grid = string[][];

export const initBoardReducer = (grid: Grid, { size }): Grid => {
  const newGrid = Array(size.x);

  for (let i = 0; i < newGrid.length; i += 1) {
    newGrid[i] = Array(size.y).fill(null);
  }

  return newGrid;
};

export const placeTileReducer = (grid: Grid, { position, tileId }): Grid => {
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

// selectors
export const getGrid = state => state.grid;
