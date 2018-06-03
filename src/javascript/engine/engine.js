/* eslint-disable class-methods-use-this */
// @flow

import { BLUE_CARD, DOWN, ENTER, ESCAPE, LEFT, RIGHT, UP } from '../common/variables';
import Board from '../constructor/board';
import { keyPressed } from '../common/keyPressed/key_pressed';
import {
  isBattlegroundGridPositionAvailable,
  keyCodeToBattlegroundPosition,
  keyCodeToPlayerHandPosition,
} from './key-handler';
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
import Sounds from './sounds';
import { monsterList } from '../constructor/common/tiles/card-tiles';
import Stone from '../constructor/card/stone';
import Monster from '../constructor/card/monster';
import { animateStoneTiles, generateStoneTile } from './board-init';

const randomMonster = () => monsterList[Object.keys(monsterList)[Math.floor(Math.random() * Object.keys(monsterList).length)]];

let cursorInPlayerGridPosition = false;
let gcs = false;

export default class Game {
  board: Board;
  cards: Array<?Monster | ?Stone>;
  playerHandCursor: Cursor;
  battlegroundCursor: Cursor;
  cardsInPlayerHand: Array<?Monster>;
  sounds: Sounds;

  constructor() {
    this.sounds = new Sounds();
    // this.sounds.music();
    this.board = new Board();
    generateStoneTile(animateStoneTiles, this.sounds).then((cards) => {
      this.cards = [...cards];
      this.gameCanStart = true;
    });
    this.cardsInPlayerHand = [
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition00,
        monster: randomMonster(),
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition01,
        monster: randomMonster(),
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition02,
        monster: randomMonster(),
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition03,
        monster: randomMonster(),
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition04,
        monster: randomMonster(),
      }),
    ];
    this.playerHandCursor = new Cursor('playerHand');
    this.battlegroundCursor = new Cursor('battleground', false);
    this.cursorInPlayerHand = true;
  }

  changeCursorPosition(e: KeyPressedEvent) {
    let nextGridPosition;
    if (this.cursorInPlayerHand) {
      nextGridPosition = keyCodeToPlayerHandPosition(e.keyCode, this.playerHandCursor.gridPosition.value, this.cardsInPlayerHand.length);
      if (nextGridPosition) {
        this.sounds.cursor();
        this.playerHandCursor.drawCursor(nextGridPosition);
      }
    } else {
      nextGridPosition = keyCodeToBattlegroundPosition(e.keyCode, this.battlegroundCursor.gridPosition.value);
      if (nextGridPosition) {
        this.sounds.cursor();
        this.battlegroundCursor.drawCursor(nextGridPosition);
      }
    }
  }

  selectOrPlaceCard() {
    if (this.cursorInPlayerHand) {
      this.sounds.cursor();
      this.playerHandCursor.stopAnimatedCursor();
      this.cursorInPlayerHand = false;
    } else {
      const cardIndexToRemove = this.playerHandCursor.gridPosition.value;
      const cardToRemove = this.cardsInPlayerHand[cardIndexToRemove];
      if (cardToRemove && isBattlegroundGridPositionAvailable(this.cards, this.battlegroundCursor.gridPosition.value)) {
        this.sounds.chooseCard();
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
          if (this.playerHandCursor.gridPosition.value === 4) {
            this.playerHandCursor.setCursorPosition(playerHandGridPosition03);
          }
          this.playerHandCursor.switchTo4Card();
        } else {
          this.cardsInPlayerHand.splice(cardIndexToRemove, 1, undefined);
        }
        this.cards.push(cardToRemove);
        this.playerHandCursor.drawAnimatedCursor();
        this.cursorInPlayerHand = true;
      } else {
        this.sounds.error();
      }
    }
  }

  backToPlayerHand() {
    if (!this.cursorInPlayerHand) {
      this.sounds.escape();
      this.playerHandCursor.drawAnimatedCursor();
      this.cursorInPlayerHand = true;
    }
  }

  set cursorInPlayerHand(value: boolean) {
    if (value) {
      this.playerHandCursor.undimCanvas();
      this.battlegroundCursor.hideCanvas();
    } else {
      this.playerHandCursor.dimCanvas();
      this.battlegroundCursor.showCanvas();
    }
    cursorInPlayerGridPosition = value;
  }

  get cursorInPlayerHand(): boolean {
    return cursorInPlayerGridPosition;
  }

  set gameCanStart(value: boolean) {
    if (value) {
      keyPressed
        .setOptions({ triggerOnce: true })
        .down([UP, DOWN, RIGHT, LEFT], this.changeCursorPosition.bind(this))
        .down(ENTER, this.selectOrPlaceCard.bind(this))
        .down(ESCAPE, this.backToPlayerHand.bind(this));
    } else {
      keyPressed.off([
        UP,
        DOWN,
        RIGHT,
        LEFT,
        ENTER,
        ESCAPE,
      ]);
    }
    gcs = value;
  }

  get gameCanStart() {
    return gcs;
  }
}
