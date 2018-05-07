// @flow

export type Tile = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type CornerTile = {
  topLeft: Tile,
  top: Tile,
  topRight: Tile,
  right: Tile,
  bottomRight: Tile,
  bottom: Tile,
  bottomLeft: Tile,
  left: Tile,
}

export type MonsterTile = {
  chocobo: Tile,
};

export type CardTile = {
  background: Tile,
  '0': Tile,
  '1': Tile,
  '2': Tile,
  '3': Tile,
  '4': Tile,
  '5': Tile,
  '6': Tile,
  '7': Tile,
  '8': Tile,
  '9': Tile,
  A: Tile,
  B: Tile,
  C: Tile,
  D: Tile,
  E: Tile,
  F: Tile,
  P: Tile,
  M: Tile,
  X: Tile,
  monster: MonsterTile,
  corner: CornerTile,
};
