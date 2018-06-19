// @flow

import {
  BOTTOM_CORNER, BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER, LEFT_CORNER,
  RIGHT_CORNER,
  TOP_CORNER,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
} from '../common/variables';
import { isValidBattlegroundPosition } from '../common/positions/battleground-positions';

export const cornerToBattlegroundPosition = (cornerNumber: number, positionValue: number): ?number => {
  let battlegroundPosition: number = -99;
  switch (cornerNumber) {
    case TOP_LEFT_CORNER:
      battlegroundPosition = positionValue - 11;
      break;
    case TOP_CORNER:
      battlegroundPosition = positionValue - 10;
      break;
    case TOP_RIGHT_CORNER:
      battlegroundPosition = positionValue - 9;
      break;
    case RIGHT_CORNER:
      battlegroundPosition = positionValue + 1;
      break;
    case BOTTOM_RIGHT_CORNER:
      battlegroundPosition = positionValue + 11;
      break;
    case BOTTOM_CORNER:
      battlegroundPosition = positionValue + 10;
      break;
    case BOTTOM_LEFT_CORNER:
      battlegroundPosition = positionValue + 9;
      break;
    case LEFT_CORNER:
      battlegroundPosition = positionValue - 1;
      break;
    default:
      break;
  }
  return isValidBattlegroundPosition(battlegroundPosition) ? battlegroundPosition : null;
};
