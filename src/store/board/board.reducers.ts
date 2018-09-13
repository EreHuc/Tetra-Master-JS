import { combineReducers } from "redux";

import { TileType } from "../../board.constants";
import { INIT_BOARD } from "./board.actions";

export const initBoardReducer = (state, { width, height }) => {
  const board = Array(width);

  for (let i = 0; i < board.length; i += 1) {
    board[i] = Array(height).fill(TileType.EMPTY);
  }

  return board;
};

const gridReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_BOARD:
      return initBoardReducer(state, action.payload);
  }
  return state;
};

export const boardReducer = combineReducers({
  grid: gridReducer,
});

// selectors
export const getGrid = state => state.grid;
