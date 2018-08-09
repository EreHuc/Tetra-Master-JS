// @flow

import Canvas from '../canvas-constructor';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
} from '../../common/variables';
import type { Tile } from '../../type/tile-type';
import type { GridPosition, EnemyHandPosition } from '../../type/canvas-type';
import type { Store } from '../../type/store-type';

export default class Card extends Canvas {
  gridPositionData: EnemyHandPosition | GridPosition;

  constructor({
    gridPosition,
    zoom,
    store,
    type = 'card',
  }: {
    gridPosition: EnemyHandPosition | GridPosition,
    zoom?: number,
    store: Store,
    type?: string,
  }):void {
    super({
      type,
      zoom,
      store,
    });
    this.gridPosition = gridPosition;
  }

  /**
   * Sequence to draw a card
   */
  drawCard(gridPosition: GridPosition | EnemyHandPosition, tile: Tile, dx: number = 0, dy: number = 0) {
    this.clearCard();
    this.gridPosition = gridPosition;
    this.drawTile(tile, dx, dy);
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
  set gridPosition(gridPosition: GridPosition | EnemyHandPosition) {
    if (this.gridPosition) {
      this.clearCard();
    }
    this.gridPositionData = Object.assign({}, gridPosition);
  }

  get gridPosition() {
    return this.gridPositionData;
  }

  setCardPosition(gridPosition: GridPosition | EnemyHandPosition) {
    this.gridPosition = gridPosition;
  }
}
