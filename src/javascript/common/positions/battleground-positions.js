// @flow

import type { GridPosition, BattlegroundPositions, CursorDelta } from '../../type/canvas-type';
import { BATTLEGROUND_CURSOR_DX, BATTLEGROUND_CURSOR_DY, CARD_HEIGHT, CARD_WIDTH } from '../variables';

export const battleGroundCursorDelta: CursorDelta = {
  dx: BATTLEGROUND_CURSOR_DX,
  dy: BATTLEGROUND_CURSOR_DY,
};

export const battlegroundGridPosition00: GridPosition = {
  x: 0,
  y: 0,
  value: 0,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition01: GridPosition = {
  x: CARD_WIDTH + 1,
  y: 0,
  value: 1,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition02: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: 0,
  value: 2,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition03: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: 0,
  value: 3,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition10: GridPosition = {
  x: 0,
  y: CARD_HEIGHT + 1,
  value: 10,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition11: GridPosition = {
  x: CARD_WIDTH + 1,
  y: CARD_HEIGHT + 1,
  value: 11,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition12: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: CARD_HEIGHT + 1,
  value: 12,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition13: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: CARD_HEIGHT + 1,
  value: 13,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition20: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 2,
  value: 20,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition21: GridPosition = {
  x: CARD_WIDTH + 1,
  y: (CARD_HEIGHT + 1) * 2,
  value: 21,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition22: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: (CARD_HEIGHT + 1) * 2,
  value: 22,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition23: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: (CARD_HEIGHT + 1) * 2,
  value: 23,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition30: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 3,
  value: 30,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition31: GridPosition = {
  x: CARD_WIDTH + 1,
  y: (CARD_HEIGHT + 1) * 3,
  value: 31,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition32: GridPosition = {
  x: (CARD_WIDTH + 1) * 2,
  y: (CARD_HEIGHT + 1) * 3,
  value: 32,
  cursor: battleGroundCursorDelta,
};

export const battlegroundGridPosition33: GridPosition = {
  x: (CARD_WIDTH + 1) * 3,
  y: (CARD_HEIGHT + 1) * 3,
  value: 33,
  cursor: battleGroundCursorDelta,
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

export const validBattlegroundPositions: Array<number> = [0, 1, 2, 3, 10, 11, 12, 13, 20, 21, 22, 23, 30, 31, 32, 33];

export const isValidBattlegroundPosition = (positionValue: number): boolean => validBattlegroundPositions.indexOf(positionValue) !== -1;
