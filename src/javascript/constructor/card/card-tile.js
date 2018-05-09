// @flow

import type { CardTile, Tile } from '../../type/tile';
import {
  aCardTile, bCardTile, cCardTile, dCardTile, eCardTile, eightCardTile, fCardTile,
  fiveCardTile,
  fourCardTile, mCardTile,
  nineCardTile, oneCardTile, pCardTile,
  sevenCardTile,
  sixCardTile, threeCardTile, twoCardTile, xCardTile,
  zeroCardTile,
} from './stat-tile';
import { bottom, bottomLeft, bottomRight, left, right, top, topLeft, topRight } from './corner-tile';
import { Chocobo } from './monster-tile';


export const blueCardTile: Tile = {
  x: 18,
  y: 822,
  width: 42,
  height: 51,
};

export const redCardTile: Tile = {
  x: 66,
  y: 822,
  width: 42,
  height: 51,
};

export const cardTiles: CardTile = {
  red: redCardTile,
  blue: blueCardTile,
  '0': zeroCardTile,
  '1': oneCardTile,
  '2': twoCardTile,
  '3': threeCardTile,
  '4': fourCardTile,
  '5': fiveCardTile,
  '6': sixCardTile,
  '7': sevenCardTile,
  '8': eightCardTile,
  '9': nineCardTile,
  A: aCardTile,
  B: bCardTile,
  C: cCardTile,
  D: dCardTile,
  E: eCardTile,
  F: fCardTile,
  P: pCardTile,
  M: mCardTile,
  X: xCardTile,
  monster: {
    Chocobo,
  },
  corner: {
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left,
  },
};
