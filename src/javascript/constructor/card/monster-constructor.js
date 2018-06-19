// @flow

import Card from './card-constructor';
import { statToHexChar } from '../../common/common';
import { cardTiles } from '../../common/tiles/card-tiles';
import {
  BLUE_CARD,
  BOTTOM_CORNER,
  BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER,
  CARD_HEIGHT,
  CARD_WIDTH,
  LEFT_CORNER, RED_CARD,
  RIGHT_CORNER, TOP_CORNER,
  TOP_LEFT_CORNER, TOP_RIGHT_CORNER,
} from '../../common/variables';
import type { MonsterTile, Tile } from '../../type/tile-type';
import type { GridPosition } from '../../type/canvas-type';
import randomGenerator from '../../common/generator/random-generator';
import type { MonsterStats } from '../../type/stat-type';
import type { Store } from '../../type/store-type';
import Canvas from '../canvas-constructor';

export default class Monster extends Card {
  stats: MonsterStats;
  corners: Array<number>;
  monster: MonsterTile;
  grid: 'battleground' | 'playerHand';
  colorTile: Tile;

  constructor({
    grid,
    color,
    gridPosition,
    monster,
    store,
    canvas,
  }: {
    grid: 'battleground' | 'playerHand',
    color?: typeof RED_CARD | typeof BLUE_CARD,
    gridPosition: GridPosition,
    monster: MonsterTile,
    store: Store,
    canvas?: Canvas
  }) {
    super({
      gridPosition,
      store,
      canvas,
    });
    this.grid = grid;
    this.monster = monster;
    this.stats = randomGenerator.stats(monster.baseStat);
    this.corners = randomGenerator.corners();
    this.colorTile = color === RED_CARD ? cardTiles.red : cardTiles.blue;
    this.switchTo5Card();
    switch (this.grid) {
      case 'battleground':
        this.translateCardToBattlegroundGrid();
        break;
      case 'playerHand':
        this.translateCardToPlayerHand();
        break;
      default:
    }
  }

  drawMonster() {
    this.drawBackground(this.colorTile);
    this.drawMonsterTile(this.monster);
    this.drawAttackStat(cardTiles[statToHexChar(this.stats.attack)]);
    this.drawTypeStat(cardTiles[this.stats.type]);
    this.drawPhysicalDefStat(cardTiles[statToHexChar(this.stats.physicalDef)]);
    this.drawMagicalDefStat(cardTiles[statToHexChar(this.stats.magicalDef)]);
    this.drawCorners(this.corners);
  }

  /**
   * Draw background image
   */
  drawBackground(colorTile: Tile): void {
    this.drawCard(this.gridPosition, colorTile);
  }

  /**
   * Draw monster tile
   * @param tile
   */
  drawMonsterTile(tile: Tile): void {
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

  checkCorners() {
    this.corners.forEach((/* corner */) => {
      // console.log('card-constructor.js:276 - ', corner, cornerToBattlegroundPosition(corner, this.gridPosition.value));
    });
  }

  /**
   * Change card to battleground grid
   */
  translateCardToBattlegroundGrid() {
    this.clearCard();
    this.translateToBattleground();
    this.drawMonster();
  }

  /**
   * Change card to player hand grid
   */
  translateCardToPlayerHand() {
    this.clearCard();
    this.translateToPlayerHand();
    this.drawMonster();
  }

  /**
   * Call to change the monster card proportion to fit in 4 player hand
   */
  switchTo4Card() {
    this.setZoom(1);
    this.drawMonster();
  }

  /**
   * Call to change the monster card proportion to fit in 5 player hand
   */
  switchTo5Card() {
    this.setZoom(0.8);
    this.drawMonster();
  }
}
