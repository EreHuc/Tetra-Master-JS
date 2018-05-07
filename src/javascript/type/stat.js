// @flow

export type MonsterStatPossibility = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type MonsterTypePossibility = 'P' | 'M' | 'X';

export type MonsterStats = {
  attack: MonsterStatPossibility,
  type: MonsterTypePossibility,
  physicalDef: MonsterStatPossibility,
  magicalDef: MonsterStatPossibility,
};
