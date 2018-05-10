// @flow

import { BocoTHEChocobo, Chocobo, FatChocobo } from '../constructor/card/monster-tile';
import Card from '../constructor/card/card';
import { BLUE_CARD, DOWN, LEFT, RED_CARD, RIGHT, UP } from '../common/variables';
import Board from '../constructor/board/board';
import { keyPressed } from '../common/keyPressed/key_pressed';
import { keyCodeToBattlegroundPosition } from './key-handler';
import {
  battlegroundGridPosition00,
  battlegroundGridPosition13, battlegroundGridPosition21,
  battlegroundGridPosition23, battlegroundGridPosition30, battlegroundGridPosition31,
} from '../constructor/common/battleground-position';
import type { GridPosition } from '../type/canvas';

const checkIfNextBattleGridPositionAvailable = (
  nextGridPosition: GridPosition,
  listOfCards: Array<Card>,
): boolean => !listOfCards.some(card => card.gridPosition.value === nextGridPosition.value);

export default class Game {
  board: Board;
  cards: Array<Card>;
  currentCard: Card;

  constructor() {
    this.board = new Board();
    this.cards = [
      new Card(BLUE_CARD, battlegroundGridPosition00, BocoTHEChocobo),
      new Card(BLUE_CARD, battlegroundGridPosition13),
      new Card(RED_CARD, battlegroundGridPosition23),
      new Card(RED_CARD, battlegroundGridPosition30, Chocobo),
      new Card(RED_CARD, battlegroundGridPosition21, FatChocobo),
      new Card(BLUE_CARD, battlegroundGridPosition31),
    ];
    // eslint-disable-next-line prefer-destructuring
    this.currentCard = this.cards[0];
    keyPressed.setOptions({ triggerOnce: true });
    keyPressed.down([UP, DOWN, RIGHT, LEFT], (e) => {
      const nextGridPosition = keyCodeToBattlegroundPosition(e.keyCode, this.currentCard.gridPosition.value);
      if (nextGridPosition && checkIfNextBattleGridPositionAvailable(nextGridPosition, this.cards)) {
        this.currentCard.drawCard(nextGridPosition);
      }
    });
  }
}
