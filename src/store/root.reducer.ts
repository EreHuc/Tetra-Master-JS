import { combineReducers } from "redux";

import { Board, boardReducer } from "./board/board.reducers";
import { Players, playersReducer } from "./players";

const rootReducer = combineReducers({
  board: boardReducer,
  players: playersReducer,
});

export type RootState = {
  board: Board;
  players: Players;
};

export default rootReducer;
