import { CARD_HEIGHT, PLAYER_HAND_CURSOR_DX, PLAYER_HAND_CURSOR_DY } from '../../../common/variables';
import type { CursorDelta, GridPosition } from '../../../type/canvas';
import { PlayerHandPositions } from '../../../type/canvas';

export const playerHandCursorDelta: CursorDelta = {
  dx: PLAYER_HAND_CURSOR_DX,
  dy: PLAYER_HAND_CURSOR_DY,
};

export const playerHandGridPosition00: GridPosition = {
  x: 0,
  y: 0,
  value: 0,
  cursor: playerHandCursorDelta,
};

export const playerHandGridPosition01: GridPosition = {
  x: 0,
  y: CARD_HEIGHT + 1,
  value: 1,
  cursor: playerHandCursorDelta,
};

export const playerHandGridPosition02: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 2,
  value: 2,
  cursor: playerHandCursorDelta,
};

export const playerHandGridPosition03: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 3,
  value: 3,
  cursor: playerHandCursorDelta,
};

export const playerHandGridPosition04: GridPosition = {
  x: 0,
  y: (CARD_HEIGHT + 1) * 4,
  value: 4,
  cursor: playerHandCursorDelta,
};

export const playerHandPositions: PlayerHandPositions = [
  playerHandGridPosition00,
  playerHandGridPosition01,
  playerHandGridPosition02,
  playerHandGridPosition03,
  playerHandGridPosition04,
];

export const valid5PlayerHandPositions: PlayerHandPositions = [0, 1, 2, 3, 4];
export const valid4PlayerHandPositions: PlayerHandPositions = [0, 1, 2, 3];

export const isValidPlayerHandPosition = (cardNumber: number): Function =>
  (positionValue: number): boolean =>
    (cardNumber > 4 ? valid5PlayerHandPositions.indexOf(positionValue) !== -1 : valid4PlayerHandPositions.indexOf(positionValue) !== -1);
