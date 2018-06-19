// @flow

import type { GridPosition } from '../type/canvas-type';
import {
  battlegroundPositions,
  isValidBattlegroundPosition,
} from '../common/positions/battleground-positions';
import { DOWN, LEFT, RIGHT, UP } from '../common/variables';
import { isValidPlayerHandPosition, playerHandPositions } from '../common/positions/player-side-positions';
import Stone from '../constructor/card/stone-constructor';
import Monster from '../constructor/card/monster-constructor';

export const isBattlegroundGridPositionAvailable = (
  listOfCards: Array<?Stone | ?Monster>,
  nextGridPositionValue: number,
): boolean => !listOfCards.some(card => card && card.gridPosition.value === nextGridPositionValue);

export const keyCodeToBattlegroundPosition = (keyCode: number, positionValue: number): ?GridPosition => {
  let nextPosition:number = -99;
  switch (keyCode) {
    case UP:
      nextPosition = positionValue - 10;
      break;
    case DOWN:
      nextPosition = positionValue + 10;
      break;
    case LEFT:
      nextPosition = positionValue - 1;
      break;
    case RIGHT:
      nextPosition = positionValue + 1;
      break;
    default:
      break;
  }
  if (nextPosition !== -99 && isValidBattlegroundPosition(nextPosition)) {
    return battlegroundPositions[nextPosition];
  }
  return null;
};

export const keyCodeToPlayerHandPosition = (keyCode: number, positionValue: number, playerHandLength: number): ?GridPosition => {
  const isValidPlayerHand = isValidPlayerHandPosition(playerHandLength);
  let nextPosition = -99;
  switch (keyCode) {
    case UP:
      nextPosition = positionValue - 1;
      break;
    case DOWN:
      nextPosition = positionValue + 1;
      break;
    default:
      break;
  }
  if (nextPosition !== -99 && isValidPlayerHand(nextPosition)) {
    return playerHandPositions[nextPosition];
  }
  return null;
};
