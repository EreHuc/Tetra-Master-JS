import { getBoardGrid } from "./board.selectors";

describe("getBoardGrid", () => {
  it("should return [['1', '1'], ['1', '1']]", () => {
    const state: any = {
      board: { grid: [["1", "1"], ["1", "1"]] },
    };
    expect(getBoardGrid(state)).toEqual([["1", "1"], ["1", "1"]]);
  });

  it("should return []", () => {
    const state: any = {
      board: {},
    };
    expect(getBoardGrid(state)).toEqual([]);
  });
});
