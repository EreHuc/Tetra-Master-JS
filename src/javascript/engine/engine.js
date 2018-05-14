// @flow

import { BocoTHEChocobo, Chocobo, FatChocobo, Goblin } from '../constructor/common/tiles/monster-tiles';
import Card from '../constructor/card';
import { BLUE_CARD, DOWN, ENTER, LEFT, RED_CARD, RIGHT, UP } from '../common/variables';
import Board from '../constructor/board';
import { keyPressed } from '../common/keyPressed/key_pressed';
import { keyCodeToPlayerHandPosition } from './key-handler';
import {
  battlegroundGridPosition00,
  battlegroundGridPosition12, battlegroundGridPosition21,
  battlegroundGridPosition23, battlegroundGridPosition30, battlegroundGridPosition31,
} from '../constructor/common/positions/battleground-positions';
import Cursor from '../constructor/cursor';
import {
  playerHandGridPosition00,
  playerHandGridPosition01,
  playerHandGridPosition02,
  playerHandGridPosition03,
  playerHandGridPosition04,
  playerHandPositions,
} from '../constructor/common/positions/player-side-positions';

export default class Game {
  board: Board;
  cards: Array<Card>;
  playerHandCursor: Cursor;
  battlegroundCursor: Cursor;
  cardsInPlayerHand: Array<?Card>;

  constructor() {
    this.board = new Board();
    this.cards = [
      new Card('battleground', BLUE_CARD, battlegroundGridPosition00, Goblin),
      new Card('battleground', BLUE_CARD, battlegroundGridPosition12),
      new Card('battleground', RED_CARD, battlegroundGridPosition23),
      new Card('battleground', RED_CARD, battlegroundGridPosition30, Chocobo),
      new Card('battleground', RED_CARD, battlegroundGridPosition21, FatChocobo),
      new Card('battleground', BLUE_CARD, battlegroundGridPosition31),
    ];
    this.cardsInPlayerHand = [
      new Card('playerHand', BLUE_CARD, playerHandGridPosition00, BocoTHEChocobo),
      new Card('playerHand', BLUE_CARD, playerHandGridPosition01, BocoTHEChocobo),
      new Card('playerHand', BLUE_CARD, playerHandGridPosition02, BocoTHEChocobo),
      new Card('playerHand', BLUE_CARD, playerHandGridPosition03, BocoTHEChocobo),
      new Card('playerHand', BLUE_CARD, playerHandGridPosition04, BocoTHEChocobo),
    ];
    this.playerHandCursor = new Cursor('playerHand');
    this.battlegroundCursor = new Cursor('battleground', false);
    keyPressed.setOptions({ triggerOnce: true });
    keyPressed.down([UP, DOWN, RIGHT, LEFT], (e) => {
      const nextGridPosition = keyCodeToPlayerHandPosition(e.keyCode, this.playerHandCursor.gridPosition.value, this.cardsInPlayerHand.length);
      if (nextGridPosition) {
        this.playerHandCursor.setCursorPosition(nextGridPosition);
      }
    });
    keyPressed.down(ENTER, () => {
      const cardIndexToRemove = this.playerHandCursor.gridPosition.value;
      const cardToRemove = this.cardsInPlayerHand[cardIndexToRemove];
      if (cardToRemove) {
        cardToRemove.setCardPosition(battlegroundGridPosition00);
        cardToRemove.translateCardToBattlegroundGrid();
        cardToRemove.switchTo4Card();
        if (this.cardsInPlayerHand.length === 5) {
          this.cardsInPlayerHand.splice(cardIndexToRemove, 1);
          this.cardsInPlayerHand.forEach((card, index) => {
            if (card) {
              card.setCardPosition(playerHandPositions[index]);
              card.switchTo4Card();
            }
          });
          this.playerHandCursor.switchTo4Card();
        } else {
          this.cardsInPlayerHand.splice(cardIndexToRemove, 1, undefined);
        }
      }
    });
  }
}
