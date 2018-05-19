// @flow

import { BocoTHEChocobo, Chocobo, FatChocobo, Goblin } from '../constructor/common/tiles/monster-tiles';
import Card from '../constructor/card';
import { BLUE_CARD, DOWN, ENTER, LEFT, RED_CARD, RIGHT, UP } from '../common/variables';
import Board from '../constructor/board';
import { keyPressed } from '../common/keyPressed/key_pressed';
import {
  isBattlegroundGridPositionAvailable,
  keyCodeToBattlegroundPosition,
  keyCodeToPlayerHandPosition,
} from './key-handler';
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
import type { KeyPressedEvent } from '../type/key_pressed';
import { generateForbiddenTile } from './board-init';

export default class Game {
  board: Board;
  cards: Array<Card>;
  playerHandCursor: Cursor;
  battlegroundCursor: Cursor;
  cardsInPlayerHand: Array<?Card>;
  cursorInPlayerGridPosition: boolean;

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
    this.cursorInPlayerHand = true;
    keyPressed
      .setOptions({ triggerOnce: true })
      .down([UP, DOWN, RIGHT, LEFT], this.changeCursorPosition.bind(this))
      .down(ENTER, this.selectOrPlaceCard.bind(this));
    generateForbiddenTile();
  }

  changeCursorPosition(e: KeyPressedEvent) {
    let nextGridPosition;
    if (this.cursorInPlayerHand) {
      nextGridPosition = keyCodeToPlayerHandPosition(e.keyCode, this.playerHandCursor.gridPosition.value, this.cardsInPlayerHand.length);
      if (nextGridPosition) {
        this.playerHandCursor.drawCursor(nextGridPosition);
      }
    } else {
      nextGridPosition = keyCodeToBattlegroundPosition(e.keyCode, this.battlegroundCursor.gridPosition.value);
      if (nextGridPosition) {
        this.battlegroundCursor.drawCursor(nextGridPosition);
      }
    }
  }

  selectOrPlaceCard() {
    if (this.cursorInPlayerHand) {
      this.playerHandCursor.stopAnimatedCursor();
      this.cursorInPlayerHand = false;
    } else {
      const cardIndexToRemove = this.playerHandCursor.gridPosition.value;
      const cardToRemove = this.cardsInPlayerHand[cardIndexToRemove];
      if (cardToRemove && isBattlegroundGridPositionAvailable(this.cards, this.battlegroundCursor.gridPosition.value)) {
        cardToRemove.setCardPosition(this.battlegroundCursor.gridPosition);
        cardToRemove.switchTo4Card();
        cardToRemove.translateCardToBattlegroundGrid();
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
        this.cards.push(cardToRemove);
        this.playerHandCursor.drawAnimatedCursor();
        this.cursorInPlayerHand = true;
      }
    }
  }

  set cursorInPlayerHand(value: boolean) {
    if (value) {
      this.playerHandCursor.canvas.undimCanvas();
      this.battlegroundCursor.canvas.hideCanvas();
    } else {
      this.playerHandCursor.canvas.dimCanvas();
      this.battlegroundCursor.canvas.showCanvas();
    }
    this.cursorInPlayerGridPosition = value;
  }

  get cursorInPlayerHand(): boolean {
    return this.cursorInPlayerGridPosition;
  }
}
