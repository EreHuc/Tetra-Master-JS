// @flow

import Canvas from '../canvas';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
} from '../../common/variables';
import type { Tile } from '../../type/tile';
import type { GridPosition } from '../../type/canvas';
import type { Store } from '../../type/store';

export default class Card extends Canvas {
  gridPositionData: GridPosition;

  constructor({
    gridPosition,
    zoom,
    store,
  }: {
    gridPosition: GridPosition,
    zoom?: number,
    store: Store,
  }):void {
    super({
      type: 'card',
      zoom,
      store,
    });
    this.gridPosition = gridPosition;
  }

  /**
   * Sequence to draw a card
   */
  drawCard(gridPosition: GridPosition, tile: Tile) {
    this.clearCard();
    this.gridPosition = gridPosition;
    this.drawTile(tile, 0, 0);
  }

  /**
   * Clear entire card
   */
  clearCard() {
    this.clearImage(this.gridPosition.x, this.gridPosition.y, CARD_WIDTH, CARD_HEIGHT);
  }

  /**
   * Generic function to draw a tile
    * @param tile
   * @param dx
   * @param dy
   */
  drawTile(tile: Tile, dx: number, dy: number): void {
    this.drawImage(
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
   * Change position of card for next draw
   * @param gridPosition
   */
  set gridPosition(gridPosition: GridPosition) {
    if (this.gridPosition) {
      this.clearCard();
    }
    this.gridPositionData = Object.assign({}, gridPosition);
  }

  get gridPosition() {
    return this.gridPositionData;
  }

  setCardPosition(gridPosition: GridPosition) {
    this.gridPosition = gridPosition;
  }
}
