/* eslint-disable consistent-return */
// @flow

import type { GridPosition } from '../type/canvas';
import Stone from '../constructor/card/stone';
import Sounds from './sounds';
import type { Store } from '../type/store';
import { battlegroundPositions, validBattlegroundPositions } from '../common/positions/battleground-positions';
import { cardTiles } from '../common/tiles/card-tiles';

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
