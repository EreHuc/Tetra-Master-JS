// @flow

import type { GridPosition, BattlegroundPositions } from '../../type/canvas';
import { CARD_HEIGHT, CARD_WIDTH } from '../../common/variables';

export const battlegroundGridPosition00: GridPosition = {
  x: 0,
  y: 0,
  value: 0,
};

export const battlegroundGridPosition01: GridPosition = {
  x: CARD_WIDTH + 1,
  y: 0,
  value: 1,
};

export const battlegroundGridPosition02: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: 0,
  value: 2,
};

export const battlegroundGridPosition03: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: 0,
  value: 3,
};

export const battlegroundGridPosition10: GridPosition = {
  x: 0,
  y: CARD_HEIGHT + 1,
  value: 10,
};

export const battlegroundGridPosition11: GridPosition = {
  x: CARD_WIDTH + 1,
  y: CARD_HEIGHT + 1,
  value: 11,
};

export const battlegroundGridPosition12: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: CARD_HEIGHT + 1,
  value: 12,
};

export const battlegroundGridPosition13: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: CARD_HEIGHT + 1,
  value: 13,
};

export const battlegroundGridPosition20: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 2,
  value: 20,
};

export const battlegroundGridPosition21: GridPosition = {
  x: CARD_WIDTH + 1,
  y: (CARD_HEIGHT + 1) * 2,
  value: 21,
};

export const battlegroundGridPosition22: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: (CARD_HEIGHT + 1) * 2,
  value: 22,
};

export const battlegroundGridPosition23: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: (CARD_HEIGHT + 1) * 2,
  value: 23,
};

export const battlegroundGridPosition30: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 3,
  value: 30,
};

export const battlegroundGridPosition31: GridPosition = {
  x: CARD_WIDTH + 1,
  y: (CARD_HEIGHT + 1) * 3,
  value: 31,
};

export const battlegroundGridPosition32: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: (CARD_HEIGHT + 1) * 3,
  value: 32,
};

export const battlegroundGridPosition33: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: (CARD_HEIGHT + 1) * 3,
  value: 33,
};

export const battlegroundPositions: BattlegroundPositions = {
  '0': battlegroundGridPosition00,
  '1': battlegroundGridPosition01,
  '2': battlegroundGridPosition02,
  '3': battlegroundGridPosition03,
  '10': battlegroundGridPosition10,
  '11': battlegroundGridPosition11,
  '12': battlegroundGridPosition12,
  '13': battlegroundGridPosition13,
  '20': battlegroundGridPosition20,
  '21': battlegroundGridPosition21,
  '22': battlegroundGridPosition22,
  '23': battlegroundGridPosition23,
  '30': battlegroundGridPosition30,
  '31': battlegroundGridPosition31,
  '32': battlegroundGridPosition32,
  '33': battlegroundGridPosition33,
};
