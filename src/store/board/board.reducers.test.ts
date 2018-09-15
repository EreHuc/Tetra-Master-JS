import { INIT_BOARD, PLACE_TILE } from "./board.actions";
import { boardReducer } from "./board.reducers";

jest.mock("uuid", () => ({ v1: jest.fn().mockReturnValue("1") }));

describe("boardReducer", () => {
  describe("empty action", () => {
    it("should return the default state", () => {
      expect(boardReducer(undefined, { type: "" })).toEqual({
        grid: [],
      });
    });
  });

  describe("INIT_BOARD action", () => {
    it("should set the player's hand to ['1', '2', '3']", () => {
      const state: any = {};
      const action = {
        type: INIT_BOARD,
        payload: { size: { x: 2, y: 2 } },
      };

      expect(boardReducer(state, action)).toEqual({
        grid: [[null, null], [null, null]],
      });
    });
  });

  describe("PLACE_TILE action", () => {
    it("should set the player's hand to ['1', '2', '3']", () => {
      const state: any = {
        grid: [[null, null], [null, null]],
      };
      const action = {
        type: PLACE_TILE,
        payload: { position: { x: 0, y: 0 }, tileId: "1" },
      };

      expect(boardReducer(state, action)).toEqual({
        grid: [["1", null], [null, null]],
      });
    });
  });
});
