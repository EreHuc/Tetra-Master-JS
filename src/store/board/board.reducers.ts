import update from "immutability-helper";
import { combineReducers } from "redux";

import { INIT_BOARD, PLACE_TILE } from "./board.actions";

export const initBoardReducer = (grid, { size }) => {
  const newGrid = Array(size.x);

  for (let i = 0; i < newGrid.length; i += 1) {
    newGrid[i] = Array(size.y).fill(null);
  }

  return newGrid;
};

export const placeTileReducer = (grid, { position }) => {
  return update(grid, {
    [position.x]: {
      [position.y]: { $set: "1" },
    },
  });
};

const gridReducer = (state = [], action) => {
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
