/* eslint-disable prefer-destructuring */
// @flow

import Canvas from './canvas';
import { CURSOR_HEIGHT, CURSOR_WIDTH, GAME_SPRITE } from '../common/variables';
import { cursorTile } from './common/tiles/cursor-tiles';
import type { GridPosition } from '../type/canvas';
import { battlegroundGridPosition00 } from './common/positions/battleground-positions';
import type { Tile } from '../type/tile';
import { infiniteSequence } from '../common/generator/sequence-generator';
import { playerHandGridPosition00 } from './common/positions/player-side-positions';
import AnimationSprite from '../engine/animations';

export default class Cursor {
  canvas: Canvas;
  cursorSequence: Iterator<number>;
  frameSequence: Iterator<number>;
  gridPosition: GridPosition;
  sprite: Tile;
  grid: 'battleground' | 'playerHand';
  requestId: number;
  animation: AnimationSprite;

  constructor(grid: 'battleground' | 'playerHand', display: boolean = true) {
    this.sprite = cursorTile[0];
    this.cursorSequence = infiniteSequence(cursorTile.length);
    this.grid = grid;
    if (this.grid === 'battleground') {
      this.canvas = new Canvas('cursor', GAME_SPRITE, display);
      this.gridPosition = battlegroundGridPosition00;
      this.translateCursorToBattleground();
    } else {
      this.canvas = new Canvas('cursor', GAME_SPRITE, display, 0.8);
      this.gridPosition = playerHandGridPosition00;
      this.translateCursorToPlayerHand();
    }
    this.animation = new AnimationSprite(() => {
      this.drawCursor(this.gridPosition);
      this.nextCursorSpriteIndex();
    }, 1000 / 10);
    this.drawAnimatedCursor();
  }

  /**
   * Start drawing animated cursor
   */
  drawAnimatedCursor() {
    this.animation.startAnimation();
  }

  stopAnimatedCursor() {
    this.animation.stopAnimation();
  }

  /**
   * Draw one sprite of cursor on canvas
   * @param gridPosition
   */
  drawCursor(gridPosition: GridPosition) {
    this.setCursorPosition(gridPosition);
    this.drawTile(this.sprite);
  }

  /**
   * Clear cursor from canvas
   */
  clearCursor() {
    const { x, y } = this.gridPosition;
    this.canvas.clearImage(x + this.gridPosition.cursor.dx, y + this.gridPosition.cursor.dy, CURSOR_WIDTH, CURSOR_HEIGHT);
  }

  /**
   * Set cursor into a grid position
   * @param gridPosition
   */
  setCursorPosition(gridPosition: ?GridPosition) {
    this.clearCursor();
    this.gridPosition = Object.assign({}, gridPosition);
  }

  /**
   * Set the next sprite for animated cursor
   */
  nextCursorSpriteIndex() {
    const nextSprite = this.cursorSequence.next().value;
    this.sprite = cursorTile[nextSprite];
  }

  /**
   * Generic function to draw a tile
   * @param tile
   */
  drawTile(tile: Tile): void {
    this.canvas.drawImage(
      tile.x,
      tile.y,
      tile.width,
      tile.height,
      (this.gridPosition.x + this.gridPosition.cursor.dx),
      (this.gridPosition.y + this.gridPosition.cursor.dy),
      tile.width,
      tile.height,
    );
  }

  /**
   * Change cursor to player hand grid
   */
  translateCursorToPlayerHand() {
    this.clearCursor();
    this.canvas.translateToPlayerHand();
  }

  /**
   * Change cursor to player hand grid
   */
  translateCursorToBattleground() {
    this.clearCursor();
    this.canvas.translateToBattleground();
  }

  switchTo4Card() {
    this.clearCursor();
    this.canvas.setZoom(1);
  }

  switchTo5Card() {
    this.clearCursor();
    this.canvas.setZoom(0.8);
  }
}
