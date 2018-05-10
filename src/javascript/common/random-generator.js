// @flow

import {
  ASSAULT_BATTLE_CLASS,
  BOTTOM_CORNER, BOTTOM_LEFT_CORNER,
  BOTTOM_RIGHT_CORNER, FLEXIBLE_BATTLE_CLASS, LEFT_CORNER, MAGICAL_BATTLE_CLASS, PHYSICAL_BATTLE_CLASS,
  RIGHT_CORNER,
  TOP_CORNER,
  TOP_LEFT_CORNER,
  TOP_RIGHT_CORNER,
} from './variables';
import type { MonsterStats, MonsterTypePossibility } from '../type/stat';

/**
 * Generate a random ID
 * @returns {string}
 */
export const randId = (): string => Math.random().toString(16).substring(2);

/**
 * Generate an id with prefix and length
 * @param prefix
 * @param length
 * @returns {string}
 */
export const namedId = (prefix: string, length: number = 4): string => `${prefix}-${randId().substring(0, length)}`;

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
 * Generate random stat between 0 and 255
 * @returns {number}
 */
const randomStats = (max: number = 256): number => Math.floor(Math.random() * max);

const mutateType = (type: MonsterTypePossibility): MonsterTypePossibility => {
  if (type === PHYSICAL_BATTLE_CLASS || type === MAGICAL_BATTLE_CLASS) {
    return Math.floor(Math.random() * 65) === 1 ? FLEXIBLE_BATTLE_CLASS : type;
  } else if (type === FLEXIBLE_BATTLE_CLASS) {
    return Math.floor(Math.random() * 129) === 1 ? ASSAULT_BATTLE_CLASS : type;
  }
  return type;
};

/**
 * Generate stats for card
 * @returns {{attack: number, type: MonsterTypePossibility, physicalDef: number, magicalDef: number}}
 */
const stats = (baseStat: MonsterStats): MonsterStats => ({
  attack: randomStats(baseStat.attack + 1),
  type: mutateType(baseStat.type),
  physicalDef: randomStats(baseStat.physicalDef + 1),
  magicalDef: randomStats(baseStat.magicalDef + 1),
});

export default { corners, stats, namedId };
