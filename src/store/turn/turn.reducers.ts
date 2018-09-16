import * as R from "ramda";

import { Id } from "../../models";
import { START_TURN } from "./turn.actions";

export type TurnState = {
  currentPlayerId?: Id;
};

const currentPlayerIdLens = R.lensProp("currentPlayerId");

const setCurrentPlayerId = (
  turnState: TurnState,
  payload: { playerId: Id },
) => {
  const { playerId } = payload;
  return R.set(currentPlayerIdLens, playerId, turnState);
};

export const turnReducer = (
  turnState: TurnState = { currentPlayerId: undefined },
  action,
): TurnState => {
  switch (action.type) {
    case START_TURN:
      return setCurrentPlayerId(turnState, action.payload);
  }
  return turnState;
};
