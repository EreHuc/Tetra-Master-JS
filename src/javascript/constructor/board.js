// @flow

import { backgroundTile, boardTiles } from '../common/tiles/board-tiles';
import Canvas from './canvas';
import type { Store } from '../type/store';

export default class Board extends Canvas {
  constructor({ store }: { store: Store }) {
    super({
      type: 'board',
      store,
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
