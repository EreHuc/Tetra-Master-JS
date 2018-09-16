import { Id } from "../../models";
import { RootState } from "../root.reducer";

// TODO: Move to store/tiles
// const mockTileTypes = [
//   { id: "1", name: "Type 1" },
//   { id: "2", name: "Type 2" },
//   { id: "3", name: "Type 3" },
//   { id: "4", name: "Type 4" },
//   { id: "5", name: "Type 5" },
//   { id: "6", name: "Type 6" },
// ];
const mockTiles = [
  { id: "1", typeId: "1" },
  { id: "2", typeId: "2" },
  { id: "3", typeId: "4" },
  { id: "4", typeId: "4" },
  { id: "5", typeId: "3" },
  { id: "6", typeId: "2" },
];
export const getTile = (tileId: Id) => (rootState: RootState) => {
  return mockTiles.find(tile => tile.id === tileId);
};
