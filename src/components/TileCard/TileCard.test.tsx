import { shallow } from "enzyme";
import * as React from "react";

import { TileCard } from "./TileCard";

const mockTile = { id: "1", typeId: "1" };
const mockPlayer = { id: "1", name: "Player 1", hand: [] };

describe("TileCard", () => {
  it("should not display the tile infos", () => {
    const wrapper = shallow(<TileCard tile={mockTile} player={mockPlayer} />);

    expect(wrapper.contains("tile 1")).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a className containing the tileId", () => {
    const wrapper = shallow(<TileCard tile={mockTile} player={mockPlayer} />);

    expect(wrapper.hasClass("tile-type-1")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a className containing the playerId", () => {
    const wrapper = shallow(<TileCard tile={mockTile} player={mockPlayer} />);

    expect(wrapper.hasClass("player-1")).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should react to mouse events", () => {
    const onClick = jest.fn();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const wrapper = shallow(
      <TileCard
        tile={mockTile}
        player={mockPlayer}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />,
    );

    wrapper.find("button").simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith();

    wrapper.find("button").simulate("mouseEnter");
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith();

    wrapper.find("button").simulate("mouseLeave");
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledWith();

    expect(wrapper).toMatchSnapshot();
  });

  describe("when focused", () => {
    it("should display the tile infos", () => {
      const wrapper = shallow(
        <TileCard tile={mockTile} player={mockPlayer} focused />,
      );

      expect(wrapper.contains("tile 1")).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when selected", () => {
    it("should have a 'selected' className", () => {
      const wrapper = shallow(
        <TileCard tile={mockTile} player={mockPlayer} selected />,
      );

      expect(wrapper.hasClass("selected")).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
