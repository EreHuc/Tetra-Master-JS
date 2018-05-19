// @flow

import {
  battlegroundPositions,
  validBattlegroundPositions,
} from '../constructor/common/positions/battleground-positions';
import { BLUE_CARD } from '../common/variables';
import Card from '../constructor/card';

export function generateForbiddenTile() {
  const nbOfForbiddenTile = Math.floor(Math.random() * 7);
  const battleGroundPositions = [...validBattlegroundPositions];
  const forbiddenCards = [];

  for (let i = 1; i <= nbOfForbiddenTile; i += 1) {
    const index = Math.random() * battleGroundPositions.length;
    const gridPosition = battleGroundPositions.splice(index, 1);
    forbiddenCards.push(new Card('battleground', BLUE_CARD, battlegroundPositions[gridPosition.toString()]));
  }

  return forbiddenCards;
}
