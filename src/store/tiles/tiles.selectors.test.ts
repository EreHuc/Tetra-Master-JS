import { getTile } from "./tiles.selectors";

describe("getTile", () => {
  it("should return { id: '1', typeId: '1' }", () => {
    const state: any = {
      tiles: {
        map: { "1": { id: "1", typeId: "1" } },
        all: ["1"],
      },
    };
    expect(getTile("1")(state)).toEqual({ id: "1", typeId: "1" });
  });

  describe("when the tile doesn't exist", () => {
    it("should return undefined", () => {
      const state: any = {
        tiles: {
          map: {},
          all: [],
        },
      };
      expect(getTile("9")(state)).toEqual(undefined);
    });
  });
});
