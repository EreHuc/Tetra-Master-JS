import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  addPlayer,
  addTilesToPlayerHand,
  FOCUS_HAND_TILE,
  focusHandTile,
  SELECT_HAND_TILE,
  selectHandTile,
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

describe("focusHandTile", () => {
  it("should return a FOCUS_HAND_TILE action", () => {
    expect(focusHandTile("1", "1")).toEqual({
      type: FOCUS_HAND_TILE,
      payload: { playerId: "1", tileId: "1" },
    });
  });
});

describe("selectHandTile", () => {
  it("should return a SELECT_HAND_TILE action", () => {
    expect(selectHandTile("1", "1")).toEqual({
      type: SELECT_HAND_TILE,
      payload: { playerId: "1", tileId: "1" },
    });
  });
});
