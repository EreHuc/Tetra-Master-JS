import { createSelector } from "reselect";

import { RootState } from "../root.reducer";
import { Board } from "./board.reducers";

const getBoardRoot = (rootState: RootState) => rootState.board;
const getGrid = (board: Board) => board.grid || [];

export const getBoardGrid = createSelector([getBoardRoot], board =>
  getGrid(board),
);
