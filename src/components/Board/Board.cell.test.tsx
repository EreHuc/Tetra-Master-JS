import { shallow } from "enzyme";
import * as React from "react";

import TileCard from "../TileCard";
import { EnhancedBoardCell } from "./Board.Cell";

const mockCell = { playerId: "1", tileId: "1" };

describe("EnhancedBoardCell", () => {
  it("should display a tile with the correct tileId", () => {
    const wrapper = shallow(
      <EnhancedBoardCell cell={mockCell} position={{ x: 1, y: 1 }} />,
    ).dive();

    expect(wrapper.find(TileCard)).toHaveLength(1);
    expect(wrapper.find(TileCard).get(0).props.tileId).toBe("1");
    expect(wrapper).toMatchSnapshot();
  });

  it("should react to clicks", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <EnhancedBoardCell
        cell={mockCell}
        position={{ x: 1, y: 1 }}
        onClick={onClick}
      />,
    ).dive();

    wrapper.find("div").simulate("click");

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith({ x: 1, y: 1 });
    expect(wrapper).toMatchSnapshot();
  });
});
