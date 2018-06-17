// @flow

import type { EnemyHandPosition } from '../../type/canvas';

const selectDx = 10;
const selectDy = 0;
const dy = 14;
const x = 11;
const y = 31;

export const enemyHandGridPosition00: EnemyHandPosition = {
  x,
  y,
  value: 0,
  select: {
    dx: selectDx,
    dy: selectDy,
  },
};

export const enemyHandGridPosition01: EnemyHandPosition = {
  x,
  y: y + dy,
  value: 1,
  select: {
    dx: selectDx,
    dy: selectDy,
  },
};

export const enemyHandGridPosition02: EnemyHandPosition = {
  x,
  y: y + (2 * dy),
  value: 2,
  select: {
    dx: selectDx,
    dy: selectDy,
  },
};

export const enemyHandGridPosition03: EnemyHandPosition = {
  x,
  y: y + (3 * dy),
  value: 3,
  select: {
    dx: selectDx,
    dy: selectDy,
  },
};

export const enemyHandGridPosition04: EnemyHandPosition = {
  x,
  y: y + (4 * dy),
  value: 4,
  select: {
    dx: selectDx,
    dy: selectDy,
  },
};

export const enemyHandPosition: Array<EnemyHandPosition> = [
  enemyHandGridPosition00,
  enemyHandGridPosition01,
  enemyHandGridPosition02,
  enemyHandGridPosition03,
  enemyHandGridPosition04,
];
