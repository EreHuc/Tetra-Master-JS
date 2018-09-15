import {
  ADD_PLAYER,
  ADD_TILE_TO_HAND,
  FOCUS_HAND_TILE,
} from "./players.actions";
import { playersReducer } from "./players.reducers";

jest.mock("uuid", () => ({ v1: jest.fn().mockReturnValue("1") }));

describe("playersReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      expect(playersReducer(undefined, { type: "" })).toEqual({
        map: {},
        all: [],
      });
    });
  });

  describe("ADD_TILE_TO_HAND action", () => {
    it("should set the player's hand to ['1', '2', '3']", () => {
      const state: any = {
        map: { "1": { hand: ["1", "2"] } },
        all: [],
      };
      const action = {
        type: ADD_TILE_TO_HAND,
        payload: { playerId: "1", tileIds: ["3"] },
      };

      expect(playersReducer(state, action)).toEqual({
        map: { "1": { hand: ["1", "2", "3"] } },
        all: [],
      });
    });
  });

  describe("ADD_PLAYER action", () => {
    it("should add 'Player 1'", () => {
      const state: any = {
        map: {},
        all: [],
      };
      const action = {
        type: ADD_PLAYER,
        payload: { player: { id: "1", name: "Player 1" } },
      };

      expect(playersReducer(state, action)).toEqual({
        map: {
          "1": { id: "1", name: "Player 1", hand: [], focusedTile: null },
        },
        all: ["1"],
      });
    });
  });

  describe("FOCUS_HAND_TILE action", () => {
    it("should set '1' in focusedTile", () => {
      const state: any = {
        map: { "1": {} },
      };
      const action = {
        type: FOCUS_HAND_TILE,
        payload: { playerId: "1", tileId: "1" },
      };

      expect(playersReducer(state, action)).toEqual({
        map: { "1": { focusedTile: "1" } },
        all: [],
      });
    });
  });

  it("should set null in focusedTile", () => {
    const state: any = {
      map: { "1": {} },
    };
    const action = {
      type: FOCUS_HAND_TILE,
      payload: { playerId: "1", tileId: null },
    };

    expect(playersReducer(state, action)).toEqual({
      map: { "1": { focusedTile: null } },
      all: [],
    });
  });
});
