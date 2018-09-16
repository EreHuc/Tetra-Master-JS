import { getCurrentPlayer } from "./turn.selectors";

describe("getCurrentPlayer", () => {
  describe("when there is a current player ('1')", () => {
    it("should return { id: '1', typeId: '1' }", () => {
      const state: any = {
        turn: {
          currentPlayerId: "1",
        },
        players: {
          map: {
            "1": { id: "1", name: "Player 1" },
          },
        },
      };
      expect(getCurrentPlayer(state)).toEqual({ id: "1", name: "Player 1" });
    });
  });

  describe("when there is no current player", () => {
    it("should return undefined", () => {
      const state: any = {
        turn: {
          currentPlayerId: undefined,
        },
      };
      expect(getCurrentPlayer(state)).toBeUndefined();
    });
  });

  describe("when the player doesn't exist", () => {
    it("should return undefined", () => {
      const state: any = {
        turn: {
          currentPlayerId: "2",
        },
        players: {
          map: {
            "1": { id: "1", name: "Player 1" },
          },
        },
      };
      expect(getCurrentPlayer(state)).toBeUndefined();
    });
  });
});
