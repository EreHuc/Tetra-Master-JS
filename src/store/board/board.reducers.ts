import update from "immutability-helper";
import { combineReducers } from "redux";

import { createSelector } from "reselect";
import { Grid } from "../../models";
import { RootState } from "../root.reducer";
import {
  INIT_BOARD,
  InitBoardAction,
  PLACE_TILE,
  PlaceTileAction,
} from "./board.actions";

export type Board = { grid: Grid };

export const initBoardReducer = (grid: Grid, action: InitBoardAction): Grid => {
  const { size } = action;
  const newGrid = Array(size.x);

  for (let i = 0; i < newGrid.length; i += 1) {
    newGrid[i] = Array(size.y).fill(null);
  }

  return newGrid;
};

export const placeTileReducer = (grid: Grid, action: PlaceTileAction): Grid => {
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

// selectors
export const getBoard = (rootState: RootState) => rootState.board;
export const getGrid = (board: Board) => board.grid;

export const getBoardGrid = createSelector([getBoard], board => getGrid(board));
