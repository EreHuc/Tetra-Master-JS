/* eslint-disable consistent-return */
// @flow

import {
  battlegroundPositions,
  validBattlegroundPositions,
} from '../constructor/common/positions/battleground-positions';
import type { GridPosition } from '../type/canvas';
import Sounds from './sounds';
import Card from '../constructor/card';
import { RED_CARD } from '../common/variables';

const sounds = new Sounds();

export function generateStoneTile(animateTiles: (gridPosition: Array<?GridPosition>, stoneCardList: Array<?Card>, resolve: Function) => Array<?Card>): Promise<Array<?Card>> {
  return new Promise((resolve) => {
    const nbOfStoneTile: number = Math.floor(Math.random() * 7);
    const battleGroundPositions: Array<number> = [...validBattlegroundPositions];
    const stoneCards: Array<?GridPosition> = [];

    for (let i = 1; i <= nbOfStoneTile; i += 1) {
      const index = Math.random() * battleGroundPositions.length;
      const gridPosition = battleGroundPositions.splice(index, 1).shift();
      stoneCards.push(battlegroundPositions[gridPosition]);
    }
    return animateTiles(stoneCards, [], resolve);
  });
}

// $FlowFixMe
export function animateStoneTiles(gridPositions: Array<?GridPosition>, stoneCardList: Array<?Card>, resolve: Function): Promise<Array<?Card>> {
  if (gridPositions && gridPositions.length) {
    window.setTimeout(() => {
      // Stupid flow fix me didn't recognise gridPositions && gridPositions.length as valid condition for shift
      // on non-null or non-undefined value...
      // $FlowFixMe
      const gridPosition: GridPosition = gridPositions.shift();
      stoneCardList.push(new Card('battleground', RED_CARD, gridPosition));
      sounds.put();
      return animateStoneTiles(gridPositions, stoneCardList, resolve);
    }, 200);
  } else {
    return resolve(stoneCardList);
  }
}