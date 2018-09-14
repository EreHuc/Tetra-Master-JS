import { getPlayerHand } from "./players.reducers";

describe("getPlayerHand", () => {
  it("should return ['1', '2']", () => {
    const state: any = {
      players: { map: { "1": { hand: ["1", "2"] } } },
    };
    expect(getPlayerHand("1")(state)).toEqual(["1", "2"]);
  });
});
