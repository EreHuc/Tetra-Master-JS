// @flow

import type { GridPosition } from '../../type/canvas';

const dy = 14;
const x = 11;
const y = 31;

export const enemyHandGridPosition00: GridPosition = {
  x,
  y,
  value: 0,
};

export const enemyHandGridPosition01: GridPosition = {
  x,
  y: y + dy,
  value: 1,
};

export const enemyHandGridPosition02: GridPosition = {
  x,
  y: y + (2 * dy),
  value: 2,
};

export const enemyHandGridPosition03: GridPosition = {
  x,
  y: y + (3 * dy),
  value: 3,
};

export const enemyHandGridPosition04: GridPosition = {
  x,
  y: y + (4 * dy),
  value: 4,
};

export const enemyHandPosition: Array<GridPosition> = [
  enemyHandGridPosition00,
  enemyHandGridPosition01,
  enemyHandGridPosition02,
  enemyHandGridPosition03,
  enemyHandGridPosition04,
];
