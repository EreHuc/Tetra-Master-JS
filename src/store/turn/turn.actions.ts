import { Id } from "../../models";

export const START_TURN = "START_TURN";

export const startTurn = (playerId: Id) => {
  return {
    type: START_TURN,
    payload: {
      playerId,
    },
  };
};
