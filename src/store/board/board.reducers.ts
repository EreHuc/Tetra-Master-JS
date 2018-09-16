import * as R from "ramda";
import { combineReducers } from "redux";

import { Cell, Grid, Id, Vector2 } from "../../models";
import { INIT_BOARD, PLACE_TILE } from "./board.actions";

export type BoardState = { grid: Grid };

export const initBoardReducer = (action: { size: Vector2 }) => {
  const { size } = action;
  const newGrid = Array(size.x);

  for (let i = 0; i < newGrid.length; i += 1) {
    newGrid[i] = Array(size.y).fill({});
  }

  return newGrid;
};

export const placeTileReducer = (action: {
  playerId: Id;
  tileId: Id;
  position: Vector2;
}) => {
  const { playerId, tileId, position } = action;

  return R.assocPath<Cell, Grid>([position.x, position.y], {
    playerId,
    tileId,
  });
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
