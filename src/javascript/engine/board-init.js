// @flow

import {
  battlegroundPositions,
  validBattlegroundPositions,
} from '../constructor/common/positions/battleground-positions';
import { BLUE_CARD } from '../common/variables';
import Card from '../constructor/card';
import Sounds from './sounds';

export function generateStoneTile(): Array<?Card> {
  const nbOfStoneTile: number = Math.floor(Math.random() * 7);
  const battleGroundPositions: Array<number> = [...validBattlegroundPositions];
  const stoneCards: Array<?Card> = [];
  const sounds: Sounds = new Sounds();

  for (let i = 1; i <= nbOfStoneTile; i += 1) {
    const index = Math.random() * battleGroundPositions.length;
    const gridPosition = battleGroundPositions.splice(index, 1);
    stoneCards.push(new Card('battleground', BLUE_CARD, battlegroundPositions[gridPosition.toString()]));
    sounds.put();
  }

  return stoneCards;
}
