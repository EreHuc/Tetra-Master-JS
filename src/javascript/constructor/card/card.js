// @flow

import Canvas from '../../generator/canvas';
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
import type { CardTile, Tile } from '../../type/tile';
import {
  aCardTile, bCardTile,
  cCardTile, dCardTile, eCardTile, eightCardTile, fCardTile, fiveCardTile,
  fourCardTile, mCardTile, nineCardTile,
  oneCardTile, pCardTile,
  sevenCardTile, sixCardTile,
  threeCardTile,
  twoCardTile, xCardTile,
  zeroCardTile,
} from './stat-tile';
import { blueCardTile, redCardTile } from './card-tile';
import { chocobo } from './monster-tile';
import {
  bottomLeft, bottomRight, topLeft, topRight, top,
  right,
  bottom,
  left,
} from './corner-tile';
import type { MonsterStatPossibility, MonsterStats, MonsterTypePossibility } from '../../type/stat';

const cardWidth: number = 42 * ZOOM_LEVEL;
const cardHeight: number = 51 * ZOOM_LEVEL;

export default class Card {
  canvas: Canvas;
  tiles: CardTile;
  stats: MonsterStats;
  corners: Array<number>;

  constructor(type: typeof RED_CARD | typeof BLUE_CARD): void {
    this.canvas = new Canvas('card', cardWidth, cardHeight, GAME_SPRITE);
    this.tiles = {
      background: type === BLUE_CARD ? blueCardTile : redCardTile,
      '0': zeroCardTile,
      '1': oneCardTile,
      '2': twoCardTile,
      '3': threeCardTile,
      '4': fourCardTile,
      '5': fiveCardTile,
      '6': sixCardTile,
      '7': sevenCardTile,
      '8': eightCardTile,
      '9': nineCardTile,
      A: aCardTile,
      B: bCardTile,
      C: cCardTile,
      D: dCardTile,
      E: eCardTile,
      F: fCardTile,
      P: pCardTile,
      M: mCardTile,
      X: xCardTile,
      monster: {
        chocobo,
      },
      corner: {
        topLeft,
        top,
        topRight,
        right,
        bottomRight,
        bottom,
        bottomLeft,
        left,
      },
    };
    this.stats = randomGenerator.stats();
    this.corners = randomGenerator.corners();
    this.drawCard(
      this.tiles.monster.chocobo,
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
    monster: Tile,
    attack: MonsterStatPossibility,
    type: MonsterTypePossibility,
    physicalDef: MonsterStatPossibility,
    magicalDef: MonsterStatPossibility,
  ): void {
    this.drawBackground();
    this.drawMonster(monster);
    this.drawAttackStat(this.tiles[attack]);
    this.drawTypeStat(this.tiles[type]);
    this.drawPhysicalDefStat(this.tiles[physicalDef]);
    this.drawMagicalDefStat(this.tiles[magicalDef]);
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
    this.canvas.drawImage(
      this.tiles.background.x,
      this.tiles.background.y,
      this.tiles.background.width,
      this.tiles.background.height,
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
   * @param dy
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
    const tile = this.tiles.corner.topLeft;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw top corner
   */
  drawTopCorner() {
    const tile = this.tiles.corner.top;
    const dx = (cardWidth / ZOOM_LEVEL / 2) - (tile.width / 2);
    const dy = 0;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw top right corner
   */
  drawTopRightCorner() {
    const tile = this.tiles.corner.topRight;
    const dx = (cardWidth / ZOOM_LEVEL) - (tile.width + 1);
    const dy = 1;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw right corner
   */
  drawRightCorner() {
    const tile = this.tiles.corner.right;
    const dx = (cardWidth / ZOOM_LEVEL) - tile.width;
    const dy = (cardHeight / ZOOM_LEVEL / 2) - (tile.height / 2);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom right corner
   */
  drawBottomRightCorner() {
    const tile = this.tiles.corner.bottomRight;
    const dx = (cardWidth / ZOOM_LEVEL) - (tile.width + 1);
    const dy = (cardHeight / ZOOM_LEVEL) - (tile.height + 1);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom corner
   */
  drawBottomCorner() {
    const tile = this.tiles.corner.bottom;
    const dx = (cardWidth / ZOOM_LEVEL / 2) - (tile.width / 2);
    const dy = (cardHeight / ZOOM_LEVEL) - tile.height;
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw bottom left corner
   */
  drawBottomLeftCorner() {
    const tile = this.tiles.corner.bottomLeft;
    const dx = 1;
    const dy = (cardHeight / ZOOM_LEVEL) - (tile.height + 1);
    this.drawTile(tile, dx, dy);
  }

  /**
   * Draw left corner
   */
  drawLeftCorner() {
    const tile = this.tiles.corner.left;
    const dx = 0;
    const dy = (cardHeight / ZOOM_LEVEL / 2) - (tile.height / 2);
    this.drawTile(tile, dx, dy);
  }
}
