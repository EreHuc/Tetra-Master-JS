// @flow

import type { CoinTile } from '../../type/tile-type';

export const blueFaceCoin: CoinTile = {
  x: 310,
  y: 808,
  width: 37,
  height: 36,
  value: 0,
  color: 'blue',
};

export const blueRightCoin: CoinTile = {
  x: 365,
  y: 784,
  width: 29,
  height: 36,
  value: 1,
  color: 'blue',
};

export const blueLeftCoin: CoinTile = {
  x: 279,
  y: 808,
  width: 29,
  height: 36,
  value: 7,
  color: 'blue',
};

export const blueEdgeCoin: CoinTile = {
  x: 397,
  y: 784,
  width: 8,
  height: 36,
  value: 2,
  color: 'blue',
};

export const redLeftCoin: CoinTile = {
  x: 414,
  y: 784,
  width: 29,
  height: 36,
  value: 3,
  color: 'red',
};


export const redFaceCoin: CoinTile = {
  x: 445,
  y: 784,
  width: 38,
  height: 36,
  value: 4,
  color: 'red',
};


export const redRightCoin: CoinTile = {
  x: 485,
  y: 784,
  width: 29,
  height: 36,
  value: 5,
  color: 'red',
};


export const redEdgeCoin: CoinTile = {
  x: 521,
  y: 784,
  width: 8,
  height: 36,
  value: 6,
  color: 'red',
};

export const coinTiles: Array<CoinTile> = [
  blueFaceCoin,
  blueRightCoin,
  blueLeftCoin,
  blueEdgeCoin,
  redLeftCoin,
  redFaceCoin,
  redRightCoin,
  redEdgeCoin,
];
