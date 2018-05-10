// @flow

import { GAME_SPRITE } from '../../common/variables';
import { backgroundTile, boardTile } from './board-tile';
import Canvas from '../common/canvas';

export default class Board {
  canvas: Canvas;

  constructor(canvas?: Canvas) {
    this.canvas = canvas || new Canvas('board', GAME_SPRITE);
    this.drawBackground();
    this.drawBoard();
    this.canvas.save();
  }

  /**
   * Draw background image
   */
  drawBackground() {
    this.canvas.drawImage(
      backgroundTile.x,
      backgroundTile.y,
      backgroundTile.width,
      backgroundTile.height,
      0, 0, backgroundTile.width, backgroundTile.height,
    );
  }

  drawBoard() {
    this.canvas.drawImage(
      boardTile.x,
      boardTile.y,
      boardTile.width,
      boardTile.height,
      ((backgroundTile.width - boardTile.width) / 2),
      0, boardTile.width, boardTile.height,
    );
  }
}
