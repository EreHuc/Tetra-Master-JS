// @flow

import Canvas from '../common/canvas';
import {
  RED_CARD,
  BLUE_CARD,
  GAME_SPRITE,
  ZOOM_LEVEL,
  TOP_LEFT_CORNER,
  TOP_CORNER,
  TOP_RIGHT_CORNER,
  RIGHT_CORNER,
  BOTTOM_RIGHT_CORNER,
  BOTTOM_CORNER,
  BOTTOM_LEFT_CORNER,
  LEFT_CORNER,
} from '../../common/variables';
import randomGenerator from '../../common/random-generator';
import { cardTiles } from './card-tile';
import type { MonsterTile, Tile } from '../../type/tile';
import type { MonsterStats, MonsterTypePossibility } from '../../type/stat';
// import { backgroundTile } from '../board/board-tile';
import { statToHexChar } from '../../common/common';

const cardWidth: number = 42 * ZOOM_LEVEL;
const cardHeight: number = 51 * ZOOM_LEVEL;

export default class Card {
  canvas: Canvas;
  stats: MonsterStats;
  corners: Array<number>;
  monster: MonsterTile;
  color: typeof RED_CARD | typeof BLUE_CARD;

  constructor(color: typeof RED_CARD | typeof BLUE_CARD, monster: MonsterTile, canvas?: Canvas): void {
    this.canvas = canvas || new Canvas('card', cardWidth, cardHeight, GAME_SPRITE);
    this.monster = monster;
    this.stats = randomGenerator.stats(monster.baseStat);
    this.corners = randomGenerator.corners();
    this.color = color;
    this.drawCard(
      this.monster,
      this.stats.attack,
      this.stats.type,
      this.stats.physicalDef,
      this.stats.magicalDef,
    );
  }

  /**
   * Sequence to draw a card
   * @param monster
   * @param attack
   * @param type
   * @param physicalDef
   * @param magicalDef
   */
  drawCard(
    monster: MonsterTile,
    attack: number,
    type: MonsterTypePossibility,
    physicalDef: number,
    magicalDef: number,
  ) {
    this.drawBackground();
    this.drawMonster(monster);
    this.drawAttackStat(cardTiles[statToHexChar(attack)]);
    this.drawTypeStat(cardTiles[type]);
    this.drawPhysicalDefStat(cardTiles[statToHexChar(physicalDef)]);
    this.drawMagicalDefStat(cardTiles[statToHexChar(magicalDef)]);
    this.drawCorners(this.corners);
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
      dx * ZOOM_LEVEL,
      dy * ZOOM_LEVEL,
      tile.width * ZOOM_LEVEL,
      tile.height * ZOOM_LEVEL,
    );
  }

  /**
   * Draw background image
   */
  drawBackground(): void {
    const colorTile: Tile = this.color === RED_CARD ? cardTiles.red : cardTiles.blue;
    this.canvas.drawImage(
      colorTile.x,
      colorTile.y,
      colorTile.width,
      colorTile.height,
      0, 0, cardWidth, cardHeight,
    );
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
    const dy = (cardHeight / ZOOM_LEVEL) - 13;
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
    const dx = (cardWidth / ZOOM_LEVEL / 2) - (tile.width / 2);
    const dy = 0;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw top right corner
   */
  drawTopRightCorner() {
    const tile = cardTiles.corner.topRight;
    const dx = (cardWidth / ZOOM_LEVEL) - (tile.width + 1);
    const dy = 1;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw right corner
   */
  drawRightCorner() {
    const tile = cardTiles.corner.right;
    const dx = (cardWidth / ZOOM_LEVEL) - tile.width;
    const dy = (cardHeight / ZOOM_LEVEL / 2) - (tile.height / 2);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom right corner
   */
  drawBottomRightCorner() {
    const tile = cardTiles.corner.bottomRight;
    const dx = (cardWidth / ZOOM_LEVEL) - (tile.width + 1);
    const dy = (cardHeight / ZOOM_LEVEL) - (tile.height + 1);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom corner
   */
  drawBottomCorner() {
    const tile = cardTiles.corner.bottom;
    const dx = (cardWidth / ZOOM_LEVEL / 2) - (tile.width / 2);
    const dy = (cardHeight / ZOOM_LEVEL) - tile.height;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom left corner
   */
  drawBottomLeftCorner() {
    const tile = cardTiles.corner.bottomLeft;
    const dx = 1;
    const dy = (cardHeight / ZOOM_LEVEL) - (tile.height + 1);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw left corner
   */
  drawLeftCorner() {
    const tile = cardTiles.corner.left;
    const dx = 0;
    const dy = (cardHeight / ZOOM_LEVEL / 2) - (tile.height / 2);
    this.drawTile(tile, dx, dy);
  }
}
