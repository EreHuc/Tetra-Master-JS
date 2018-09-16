import {
  getAllPlayerIds,
  getPlayer,
  getPlayerAtIndex,
  getPlayerIdAtIndex,
} from "./players.selectors";

describe("getAllPlayersIds", () => {
  it("should return ['1', '2']", () => {
    const state: any = {
      players: { all: ["1", "2"] },
    };
    expect(getAllPlayerIds(state)).toEqual(["1", "2"]);
  });

  it("should return []", () => {
    const state: any = {
      players: {},
    };
    expect(getAllPlayerIds(state)).toEqual([]);
  });
});

describe("getAllPlayerIds", () => {
  it("should return ['1', '2']", () => {
    const state: any = {
      players: {
        all: ["1", "2"],
      },
    };
    expect(getAllPlayerIds(state)).toEqual(["1", "2"]);
  });

  it("should return []", () => {
    const state: any = {
      players: {},
    };
    expect(getAllPlayerIds(state)).toEqual([]);
  });
});

describe("getPlayer", () => {
  it("should return { name: 'Player 1' }", () => {
    const state: any = {
      players: {
        map: { "1": { name: "Player 1" } },
        all: ["1", "2"],
      },
    };
    expect(getPlayer("1")(state)).toEqual({ name: "Player 1" });
  });

  it("should return undefined", () => {
    const state: any = {
      players: {
        map: {},
        all: ["1", "2"],
      },
    };
    expect(getPlayer("1")(state)).toBeUndefined();
  });
});

describe("getPlayerAtIndex", () => {
  it("should return { name: 'Player 1' }", () => {
    const state: any = {
      players: {
        map: { "1": { name: "Player 1" } },
        all: ["1", "2"],
      },
    };
    expect(getPlayerAtIndex(0)(state)).toEqual({ name: "Player 1" });
  });

  it("should return undefined", () => {
    const state: any = {
      players: {
        map: { "1": { name: "Player 1" } },
        all: ["1", "2"],
      },
    };
    expect(getPlayerAtIndex(2)(state)).toBeUndefined();
  });
});

describe("getPlayerIdAtIndex", () => {
  it("should return '1'", () => {
    const state: any = {
      players: {
        map: { "1": { hand: ["1", "2"] } },
        all: ["1", "2"],
      },
    };
    expect(getPlayerIdAtIndex(0)(state)).toEqual("1");
  });

  it("should return undefined", () => {
    const state: any = {
      players: {
        map: { "1": {} },
        all: ["1", "2"],
      },
    };
    expect(getPlayerIdAtIndex(2)(state)).toBeUndefined();
  });
});
