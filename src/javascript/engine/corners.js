// @flow

import {
  BOTTOM_CORNER, BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER, LEFT_CORNER,
  RIGHT_CORNER,
  TOP_CORNER,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
} from '../common/variables';

export const validBattlegroundPositions: Array<number> = [0, 1, 2, 3, 10, 11, 12, 13, 20, 21, 22, 23, 30, 31, 32, 33];

export const isValidBattlegroundPosition = (positionValue: number): boolean => validBattlegroundPositions.indexOf(positionValue) !== -1;

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
