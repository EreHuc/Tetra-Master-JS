import { Id } from "../../models";

export type TurnState = {
  currentPlayerId?: Id;
};

export const turnReducer = (turnState: TurnState = {}, action): TurnState => {
  // switch (action.type) {
  //   case INIT_BOARD:
  //     return initBoardReducer(action.payload);
  //   case PLACE_TILE:
  //     return placeTileReducer(action.payload)(grid);
  // }
  return turnState;
};
