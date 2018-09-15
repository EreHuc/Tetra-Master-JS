import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  addPlayer,
  addTilesToPlayerHand,
} from "./players.actions";

describe("addPlayer", () => {
  it("should return a ADD_PLAYER action", () => {
    expect(addPlayer({ name: "Player 1" })).toEqual({
      type: ADD_PLAYER,
      payload: { player: { name: "Player 1" } },
    });
  });
});

describe("addTilesToPlayerHand", () => {
  it("should return a ADD_TILE_TO_HAND action", () => {
    expect(addTilesToPlayerHand("1", ["1"])).toEqual({
      type: ADD_TILE_TO_HAND,
      payload: { playerId: "1", tileIds: ["1"] },
    });
  });
});
