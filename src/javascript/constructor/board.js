// @flow

import { backgroundTile, boardTiles } from './common/tiles/board-tiles';
import Canvas from './canvas';

export default class Board extends Canvas {
  constructor() {
    super({
      type: 'board',
    });
    this.drawBackground();
    this.drawBoard();
  }

  /**
   * Draw background image
   */
  drawBackground() {
    this.drawImage(
      backgroundTile.x,
      backgroundTile.y,
      backgroundTile.width,
      backgroundTile.height,
      0, 0, backgroundTile.width, backgroundTile.height,
    );
  }

  drawBoard() {
    this.drawImage(
      boardTiles.x,
      boardTiles.y,
      boardTiles.width,
      boardTiles.height,
      ((backgroundTile.width - boardTiles.width) / 2),
      0, boardTiles.width, boardTiles.height,
    );
  }
}
