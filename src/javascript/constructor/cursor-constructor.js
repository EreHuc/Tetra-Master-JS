/* eslint-disable prefer-destructuring */
// @flow

import Canvas from './canvas-constructor';
import { CURSOR_HEIGHT, CURSOR_WIDTH } from '../common/variables';
import { cursorTile } from '../common/tiles/cursor-tiles';
import type { GridPosition } from '../type/canvas-type';
import { battlegroundGridPosition00 } from '../common/positions/battleground-positions';
import type { Tile } from '../type/tile-type';
import { infiniteSequence } from '../common/generator/sequence-generator';
import { playerHandGridPosition00 } from '../common/positions/player-side-positions';
import type { Store } from '../type/store-type';
import AnimationSprite from './animations-constructor';

export default class Cursor extends Canvas {
  cursorSequence: Iterator<number>;
  frameSequence: Iterator<number>;
  gridPosition: GridPosition;
  sprite: Tile;
  grid: 'battleground' | 'playerHand';
  requestId: number;
  animation: AnimationSprite;

  constructor({ grid, display = true, store }: {grid: 'battleground' | 'playerHand', display?: boolean, store: Store}) {
    super({
      type: 'cursor',
      display,
      store,
    });
    this.sprite = cursorTile[0];
    this.cursorSequence = infiniteSequence(cursorTile.length);
    this.grid = grid;
    if (this.grid === 'battleground') {
      this.gridPosition = battlegroundGridPosition00;
      this.translateCursorToBattleground();
    } else {
      this.setZoom(0.8);
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
    this.clearImage(x + this.gridPosition.cursor.dx, y + this.gridPosition.cursor.dy, CURSOR_WIDTH, CURSOR_HEIGHT);
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
    this.drawImage(
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
    this.translateToPlayerHand();
  }

  /**
   * Change cursor to player hand grid
   */
  translateCursorToBattleground() {
    this.clearCursor();
    this.translateToBattleground();
  }

  switchTo4Card() {
    this.clearCursor();
    this.setZoom(1);
  }

  switchTo5Card() {
    this.clearCursor();
    this.setZoom(0.8);
  }
}
