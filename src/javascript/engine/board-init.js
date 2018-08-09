/* eslint-disable consistent-return */
// @flow

import type { GridPosition } from '../type/canvas-type';
import Stone from '../constructor/card/stone-constructor';
import Sounds from '../constructor/sounds-constructor';
import type { Store } from '../type/store-type';
import { battlegroundPositions, validBattlegroundPositions } from '../common/positions/battleground-positions';
import { cardTiles, monsterList } from '../common/tiles/card-tiles';
import EnemyHandCard from '../constructor/card/enemy-cards-constructor';
import { enemyHandPosition } from '../common/positions/enemy-side-positions';

export const randomMonster = () => monsterList[Object.keys(monsterList)[Math.floor(Math.random() * Object.keys(monsterList).length)]];

export function generateStoneTile(
  animateTiles:
    (gridPosition: Array<?GridPosition>,
     stoneCardList: Array<?Stone>,
     sounds: Sounds, store: Store,
     resolve: Function) => Array<?Stone>,
  sounds: Sounds,
  store: Store,
): Promise<Array<?Stone>> {
  return new Promise((resolve) => {
    const nbOfStoneTile: number = Math.floor(Math.random() * 7);
    const battleGroundPositions: Array<number> = [...validBattlegroundPositions];
    const stoneCards: Array<?GridPosition> = [];

    for (let i = 1; i <= nbOfStoneTile; i += 1) {
      const index = Math.random() * battleGroundPositions.length;
      const gridPosition = battleGroundPositions.splice(index, 1).shift();
      stoneCards.push(battlegroundPositions[gridPosition]);
    }
    return animateTiles(stoneCards, [], sounds, store, resolve);
  });
}

// $FlowFixMe
export function animateStoneTiles(gridPositions: Array<?GridPosition>, stoneCardList: Array<?Stone>, sounds: Sounds, store: Store, resolve: Function): Promise<Array<?Stone>> {
  if (gridPositions && gridPositions.length) {
    const gridPosition: GridPosition = gridPositions.shift();
    const stone: Stone = new Stone({ stone: cardTiles.stone1, gridPosition, store });
    stone.onAnimationFinished(() => {
      sounds.put();
      animateStoneTiles(gridPositions, stoneCardList, sounds, store, resolve);
    });
    stoneCardList.push(stone);
  } else {
    return resolve(stoneCardList);
  }
}

export const generateEnemyHand =
  (generateTestEnemyHand: Function, index: number, store: Store, enemyHand?: Array<?EnemyHandCard> = []) =>
    new Promise(resolve =>
      generateTestEnemyHand(index, store, enemyHand, resolve));

export const enemyHandGenerator = (index: number, store: Store, enemyHand?: Array<?EnemyHandCard> = [], resolve: Function): ?Promise<Array<?EnemyHandCard>> => {
  if (index < 5) {
    const card = new EnemyHandCard({
      store,
      gridPosition: enemyHandPosition[index],
      monster: randomMonster(),
    });
    enemyHand.push(card);
    card.onAnimationFinished(() => {
      enemyHandGenerator(index + 1, store, enemyHand, resolve);
    });
  } else {
    return resolve(enemyHand);
  }
};
