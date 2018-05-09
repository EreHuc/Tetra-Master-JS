// @flow

export type AssaultBatteClass = 'A';

export type PhysicalBattleClass = 'P';

export type MagicalBattleClass = 'M';

export type FlexibleBattleClass = 'X';

export type MonsterTypePossibility = AssaultBatteClass | PhysicalBattleClass | MagicalBattleClass | FlexibleBattleClass;

export type MonsterStats = {
  attack: number,
  type: MonsterTypePossibility,
  physicalDef: number,
  magicalDef: number,
};
