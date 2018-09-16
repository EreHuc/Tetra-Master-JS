import { START_TURN, startTurn } from "./turn.actions";

describe("startTurn", () => {
  it("should return a START_TURN action", () => {
    expect(startTurn("1")).toEqual({
      type: START_TURN,
      payload: { playerId: "1" },
    });
  });
});
