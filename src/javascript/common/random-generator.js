// @flow

import {
  BOTTOM_CORNER, BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER, LEFT_CORNER,
  RIGHT_CORNER,
  TOP_CORNER,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
} from './variables';
import type { MonsterStatPossibility, MonsterStats, MonsterTypePossibility } from '../type/stat';

/**
 * Generate corners for card
 * @returns {Array}
 */
const corners = (): Array<number> => {
  const cornersList = [
    TOP_LEFT_CORNER,
    TOP_CORNER,
    TOP_RIGHT_CORNER,
    RIGHT_CORNER,
    BOTTOM_RIGHT_CORNER,
    BOTTOM_CORNER,
    BOTTOM_LEFT_CORNER,
    LEFT_CORNER,
  ];
  const nbCorner = Math.round(Math.random() * cornersList.length);
  const randomCorner = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nbCorner; i++) {
    randomCorner.push(...cornersList.splice(Math.floor(Math.random() * cornersList.length), 1));
  }

  return randomCorner;
};

/**
 * Generate stats for card
 * @returns {{attack: MonsterStatPossibility, type: MonsterTypePossibility, physicalDef: MonsterStatPossibility, magicalDef: MonsterStatPossibility}}
 */
const stats = (): MonsterStats => {
  const statList: Array<MonsterStatPossibility> = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
  ];
  const typeList: Array<MonsterTypePossibility> = [
    'P', 'M', 'X',
  ];
  return {
    attack: statList[Math.floor(Math.random() * statList.length)],
    type: typeList[Math.floor(Math.random() * typeList.length)],
    physicalDef: statList[Math.floor(Math.random() * statList.length)],
    magicalDef: statList[Math.floor(Math.random() * statList.length)],
  };
};

export default { corners, stats };
