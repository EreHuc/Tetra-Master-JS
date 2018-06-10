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
} from '../common/positions/player-side-positions';
import type { KeyPressedEvent } from '../type/key_pressed';
import Sounds from './sounds';
import { monsterList } from '../common/tiles/card-tiles';
import Stone from '../constructor/card/stone';
import Monster from '../constructor/card/monster';
import { animateStoneTiles, generateStoneTile } from './board-init';
import type { Store } from '../type/store';
import { StoreClass } from '../constructor/store';
import EnemyHandCard from '../constructor/card/enemy-hand';
import { enemyHandPosition } from '../common/positions/enemy-side-positions';

const randomMonster = () => monsterList[Object.keys(monsterList)[Math.floor(Math.random() * Object.keys(monsterList).length)]];

const generateTestEnemyHand = (index: number, store: Store, enemyHand?: Array<?EnemyHandCard> = []): ?Array<?EnemyHandCard> => {
  if (index < 5) {
    const card = new EnemyHandCard({
      store,
      gridPosition: enemyHandPosition[index],
      monster: randomMonster(),
    });
    enemyHand.push(card);
    card.onAnimationFinished(() => {
      generateTestEnemyHand(index + 1, store, enemyHand);
    });
  } else {
    return enemyHand;
  }
};

export default class Game extends StoreClass {
  board: Board;
  cards: Array<?Monster | ?Stone>;
  playerHandCursor: Cursor;
  battlegroundCursor: Cursor;
  cardsInPlayerHand: Array<?Monster>;
  sounds: Sounds;
  store: Store;

  constructor({ store }:{store: Store}) {
    super(store);
    generateTestEnemyHand(0, store);
    this.sounds = new Sounds();
    // this.sounds.music();
    this.board = new Board({ store });
    generateStoneTile(animateStoneTiles, this.sounds, this.store).then((cards) => {
      this.cards = [...cards];
      this.store.dispatch({ type: 'GAME_STARTED' });
    });
    this.cardsInPlayerHand = [
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition00,
        monster: randomMonster(),
        store,
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition01,
        monster: randomMonster(),
        store,
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition02,
        monster: randomMonster(),
        store,
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition03,
        monster: randomMonster(),
        store,
      }),
      new Monster({
        grid: 'playerHand',
        color: BLUE_CARD,
        gridPosition: playerHandGridPosition04,
        monster: randomMonster(),
        store,
      }),
    ];
    this.playerHandCursor = new Cursor({ grid: 'playerHand', store });
    this.battlegroundCursor = new Cursor({ grid: 'battleground', display: false, store });
    this.store.dispatch({ type: 'SHOW_CURSOR' });
    this.store.subscribe(({ action }) => {
      switch (action.type) {
        case 'GAME_STARTED':
          keyPressed
            .setOptions({ triggerOnce: true })
            .down([UP, DOWN, RIGHT, LEFT], this.changeCursorPosition.bind(this))
            .down(ENTER, this.selectOrPlaceCard.bind(this))
            .down(ESCAPE, this.backToPlayerHand.bind(this));
          break;
        case 'SHOW_CURSOR':
          this.playerHandCursor.undimCanvas();
          this.battlegroundCursor.hideCanvas();
          break;
        case 'HIDE_CURSOR':
          this.playerHandCursor.dimCanvas();
          this.battlegroundCursor.showCanvas();
          break;
        default:
      }
    });
  }

  changeCursorPosition(e: KeyPressedEvent) {
    let nextGridPosition;
    if (this.store.getState().displayPlayerHandCursor) {
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
    if (this.store.getState().displayPlayerHandCursor) {
      this.sounds.cursor();
      this.playerHandCursor.stopAnimatedCursor();
      this.store.dispatch({ type: 'HIDE_CURSOR' });
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
        this.store.dispatch({ type: 'SHOW_CURSOR' });
      } else {
        this.sounds.error();
      }
    }
  }

  backToPlayerHand() {
    if (!this.store.getState().displayPlayerHandCursor) {
      this.sounds.escape();
      this.playerHandCursor.drawAnimatedCursor();
      this.store.dispatch({ type: 'SHOW_CURSOR' });
    }
  }
}
