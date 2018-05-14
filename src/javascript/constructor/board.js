// @flow

import { GAME_SPRITE } from '../common/variables';
import { backgroundTile, boardTiles } from './common/tiles/board-tiles';
import Canvas from './canvas';

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
      boardTiles.x,
      boardTiles.y,
      boardTiles.width,
      boardTiles.height,
      ((backgroundTile.width - boardTiles.width) / 2),
      0, boardTiles.width, boardTiles.height,
    );
  }
}
