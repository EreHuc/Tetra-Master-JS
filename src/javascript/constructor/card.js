// @flow

import Canvas from './canvas';
import {
  RED_CARD,
  BLUE_CARD,
  GAME_SPRITE,
  TOP_LEFT_CORNER,
  TOP_CORNER,
  TOP_RIGHT_CORNER,
  RIGHT_CORNER,
  BOTTOM_RIGHT_CORNER,
  BOTTOM_CORNER,
  BOTTOM_LEFT_CORNER,
  LEFT_CORNER, CARD_HEIGHT, CARD_WIDTH,
} from '../common/variables';
import randomGenerator from '../common/generator/random-generator';
import { cardTiles } from './common/tiles/card-tiles';
import type { MonsterTile, Tile } from '../type/tile';
import type { MonsterStats } from '../type/stat';
import { statToHexChar } from '../common/common';
import type { GridPosition } from '../type/canvas';
import AnimationSprite from '../engine/animations';

export default class Card {
  canvas: Canvas;
  stats: MonsterStats;
  corners: Array<number>;
  monster: MonsterTile;
  colorTile: Tile;
  gridPosition: GridPosition;
  grid: 'battleground' | 'playerHand';
  animation: AnimationSprite;
  zoom: number;

  constructor(grid: 'battleground' | 'playerHand', color: typeof RED_CARD | typeof BLUE_CARD, gridPosition: GridPosition, monster?: MonsterTile, canvas?: Canvas): void {
    this.grid = grid;
    if (monster) {
      this.monster = monster;
      this.stats = randomGenerator.stats(monster.baseStat);
      this.corners = randomGenerator.corners();
      this.colorTile = color === RED_CARD ? cardTiles.red : cardTiles.blue;
    } else {
      this.zoom = 2;
      this.colorTile = color === RED_CARD ? cardTiles.stone1 : cardTiles.stone2;
      this.animation = new AnimationSprite(() => {
        if (this.zoom < 1) {
          this.animation.stopAnimation();
        } else {
          this.clearCard();
          this.canvas.setZoom(this.zoom);
          this.drawCard(this.gridPosition);
          this.zoom = Number((this.zoom - 0.1).toFixed(1));
        }
      }, (1000 / 60));
    }
    if (this.grid === 'battleground') {
      this.canvas = canvas || new Canvas('card', GAME_SPRITE);
      this.setCardPosition(gridPosition);
      this.translateCardToBattlegroundGrid();
    } else {
      this.canvas = canvas || new Canvas('card', GAME_SPRITE, true, 0.8);
      this.setCardPosition(gridPosition);
      this.translateCardToPlayerHand();
    }
  }

  /**
   * Sequence to draw a card
   */
  drawCard(gridPosition: GridPosition) {
    this.clearCard();
    this.setCardPosition(gridPosition);
    this.drawBackground(this.colorTile);
    if (this.monster) {
      this.drawMonster(this.monster);
      this.drawAttackStat(cardTiles[statToHexChar(this.stats.attack)]);
      this.drawTypeStat(cardTiles[this.stats.type]);
      this.drawPhysicalDefStat(cardTiles[statToHexChar(this.stats.physicalDef)]);
      this.drawMagicalDefStat(cardTiles[statToHexChar(this.stats.magicalDef)]);
      this.drawCorners(this.corners);
    }
  }

  /**
   * Clear entire card
   */
  clearCard() {
    this.canvas.clearImage(this.gridPosition.x, this.gridPosition.y, CARD_WIDTH, CARD_HEIGHT);
  }

  /**
   * Generic function to draw a tile
    * @param tile
   * @param dx
   * @param dy
   */
  drawTile(tile: Tile, dx: number, dy: number): void {
    this.canvas.drawImage(
      tile.x,
      tile.y,
      tile.width,
      tile.height,
      (this.gridPosition.x + dx),
      (this.gridPosition.y + dy),
      tile.width,
      tile.height,
    );
  }

  /**
   * Draw background image
   */
  drawBackground(colorTile: Tile): void {
    this.drawTile(colorTile, 0, 0);
  }

  /**
   * Draw monster tile
   * @param tile
   */
  drawMonster(tile: Tile): void {
    const dx = 2;
    const dy = 2;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Generic function to draw stat tile
   * @param tile
   * @param dx
   */
  drawStatTile(tile: Tile, dx: number): void {
    const dy = CARD_HEIGHT - 13;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw attack stat
   * @param tile
   */
  drawAttackStat(tile: Tile): void {
    const dx = 7;
    this.drawStatTile(tile, dx);
  }

  /**
   * Draw attack type stat
   * @param tile
   */
  drawTypeStat(tile: Tile): void {
    const dx = 7 + tile.width;
    this.drawStatTile(tile, dx);
  }

  /**
   * Draw physical defense stat
   * @param tile
   */
  drawPhysicalDefStat(tile: Tile): void {
    const dx = 7 + (2 * tile.width);
    this.drawStatTile(tile, dx);
  }

  /**
   * Draw magical defense stat
   * @param tile
   */
  drawMagicalDefStat(tile: Tile): void {
    const dx = 7 + (3 * tile.width);
    this.drawStatTile(tile, dx);
  }

  /**
   * Draw card's corners
   * @param cornerList
   */
  drawCorners(cornerList: Array<number>): void {
    cornerList.forEach((corner) => {
      switch (corner) {
        case TOP_LEFT_CORNER:
          this.drawTopLeftCorner();
          break;
        case TOP_CORNER:
          this.drawTopCorner();
          break;
        case TOP_RIGHT_CORNER:
          this.drawTopRightCorner();
          break;
        case RIGHT_CORNER:
          this.drawRightCorner();
          break;
        case BOTTOM_RIGHT_CORNER:
          this.drawBottomRightCorner();
          break;
        case BOTTOM_CORNER:
          this.drawBottomCorner();
          break;
        case BOTTOM_LEFT_CORNER:
          this.drawBottomLeftCorner();
          break;
        case LEFT_CORNER:
          this.drawLeftCorner();
          break;
        default:
          break;
      }
    });
  }

  /**
   * Draw top left corner
   */
  drawTopLeftCorner(): void {
    const dx = 1;
    const dy = 1;
    const tile = cardTiles.corner.topLeft;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw top corner
   */
  drawTopCorner() {
    const tile = cardTiles.corner.top;
    const dx = (CARD_WIDTH / 2) - (tile.width / 2);
    const dy = 0;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw top right corner
   */
  drawTopRightCorner() {
    const tile = cardTiles.corner.topRight;
    const dx = CARD_WIDTH - (tile.width + 1);
    const dy = 1;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw right corner
   */
  drawRightCorner() {
    const tile = cardTiles.corner.right;
    const dx = CARD_WIDTH - tile.width;
    const dy = (CARD_HEIGHT / 2) - (tile.height / 2);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom right corner
   */
  drawBottomRightCorner() {
    const tile = cardTiles.corner.bottomRight;
    const dx = CARD_WIDTH - (tile.width + 1);
    const dy = CARD_HEIGHT - (tile.height + 1);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom corner
   */
  drawBottomCorner() {
    const tile = cardTiles.corner.bottom;
    const dx = (CARD_WIDTH / 2) - (tile.width / 2);
    const dy = CARD_HEIGHT - tile.height;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom left corner
   */
  drawBottomLeftCorner() {
    const tile = cardTiles.corner.bottomLeft;
    const dx = 1;
    const dy = CARD_HEIGHT - (tile.height + 1);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw left corner
   */
  drawLeftCorner() {
    const tile = cardTiles.corner.left;
    const dx = 0;
    const dy = (CARD_HEIGHT / 2) - (tile.height / 2);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Change position of card for next draw
   * @param gridPosition
   */
  setCardPosition(gridPosition: GridPosition) {
    if (this.gridPosition) {
      this.clearCard();
    }
    this.gridPosition = Object.assign({}, gridPosition);
  }

  /**
   * Change card to battleground grid
   */
  translateCardToBattlegroundGrid() {
    this.clearCard();
    this.canvas.translateToBattleground();
    if (this.monster) {
      this.drawCard(this.gridPosition);
    } else {
      this.animateStoneCard();
    }
  }

  /**
   * Change card to player hand grid
   */
  translateCardToPlayerHand() {
    this.clearCard();
    this.canvas.translateToPlayerHand();
    this.drawCard(this.gridPosition);
  }

  checkCorners() {
    this.corners.forEach((/* corner */) => {
      // console.log('card.js:276 - ', corner, cornerToBattlegroundPosition(corner, this.gridPosition.value));
    });
  }

  switchTo4Card() {
    this.canvas.setZoom(1);
    this.drawCard(this.gridPosition);
  }

  switchTo5Card() {
    this.canvas.setZoom(0.8);
    this.drawCard(this.gridPosition);
  }

  animateStoneCard() {
    this.animation.startAnimation();
  }
}
