import { combineReducers } from "redux";

import { boardReducer, getGrid } from "./board/board.reducers";

const rootReducer = combineReducers({
  board: boardReducer,
});

// selectors
export const getBoard = state => getGrid(state.board);

export default rootReducer;
