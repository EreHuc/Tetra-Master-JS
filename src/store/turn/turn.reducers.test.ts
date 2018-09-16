import { START_TURN } from "./turn.actions";
import { turnReducer } from "./turn.reducers";

describe("turnReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      expect(turnReducer(undefined, { type: "" })).toEqual({
        currentPlayerId: undefined,
      });
    });
  });

  describe("START_TURN action", () => {
    it("should set the player's hand to ['1', '2', '3']", () => {
      const state: any = {};
      const action = {
        type: START_TURN,
        payload: { playerId: "1" },
      };

      expect(turnReducer(state, action)).toEqual({
        currentPlayerId: "1",
      });
    });
  });
});
