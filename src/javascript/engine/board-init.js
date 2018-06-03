/* eslint-disable consistent-return */
// @flow

import {
  battlegroundPositions,
  validBattlegroundPositions,
} from '../constructor/common/positions/battleground-positions';
import type { GridPosition } from '../type/canvas';
import Stone from '../constructor/card/stone';
import { cardTiles } from '../constructor/common/tiles/card-tiles';
import Sounds from './sounds';

export function generateStoneTile(animateTiles: (gridPosition: Array<?GridPosition>, stoneCardList: Array<?Stone>, sounds: Sounds, resolve: Function) => Array<?Stone>, sounds: Sounds): Promise<Array<?Stone>> {
  return new Promise((resolve) => {
    const nbOfStoneTile: number = Math.floor(Math.random() * 7);
    const battleGroundPositions: Array<number> = [...validBattlegroundPositions];
    const stoneCards: Array<?GridPosition> = [];

    for (let i = 1; i <= nbOfStoneTile; i += 1) {
      const index = Math.random() * battleGroundPositions.length;
      const gridPosition = battleGroundPositions.splice(index, 1).shift();
      stoneCards.push(battlegroundPositions[gridPosition]);
    }
    return animateTiles(stoneCards, [], sounds, resolve);
  });
}

// $FlowFixMe
export function animateStoneTiles(gridPositions: Array<?GridPosition>, stoneCardList: Array<?Stone>, sounds: Sounds, resolve: Function): Promise<Array<?Stone>> {
  if (gridPositions && gridPositions.length) {
    const gridPosition: GridPosition = gridPositions.shift();
    const stone: Stone = new Stone({ stone: cardTiles.stone1, gridPosition });
    stone.onAnimationFinished(() => {
      sounds.put();
      animateStoneTiles(gridPositions, stoneCardList, sounds, resolve);
    });
    stoneCardList.push(stone);
  } else {
    return resolve(stoneCardList);
  }
}
