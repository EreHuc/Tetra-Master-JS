// @flow

import type { GridPosition } from '../type/canvas';
import { isValidBattlegroundPosition } from './corners';
import { battlegroundPositions } from '../constructor/common/battleground-position';
import { DOWN, LEFT, RIGHT, UP } from '../common/variables';

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
  return isValidBattlegroundPosition(nextPosition) ? battlegroundPositions[nextPosition] : null;
};
