import { createSelector } from "reselect";

import { RootState } from "../root.reducer";
import { BoardState } from "./board.reducers";

const getBoardRoot = (rootState: RootState) => rootState.board;
const getGrid = (board: BoardState) => board.grid || [];

export const getBoardGrid = createSelector([getBoardRoot], board =>
  getGrid(board),
);
