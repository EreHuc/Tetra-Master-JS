// @flow

import StoreClass from './store-constructor';

import { cleanRect, drawImage, translate } from '../common/common';
import { namedId } from '../common/generator/random-generator';
import {
  BATTLEGROUND_COORD_X,
  BATTLEGROUND_COORD_Y,
  CANVAS_HEIGHT,
  CANVAS_WIDTH, GAME_SPRITE, PLAYER_HAND_COORD_X, PLAYER_HAND_COORD_Y,
  ZOOM_LEVEL,
} from '../common/variables';

import type { CoordPosition } from '../type/canvas-type';
import type { Store } from '../type/store-type';

export default class Canvas extends StoreClass {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
  canvasPositionData: CoordPosition;
  zoom: number;
  store: Store;

  constructor({
    type,
    image = GAME_SPRITE,
    display = true,
    zoom = 1,
    store,
  }: {type: string, image?: HTMLImageElement, display?: boolean, zoom?: number, store: Store}) {
    super(store);
    const element: HTMLElement = (document.querySelector('.game'): any);
    const canvasId: string = namedId('canvas');
    this.zoom = zoom;
    this.image = image;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('tetra-master', ...type.split(' '));
    this.canvas.setAttribute('id', canvasId);
    this.canvas.width = CANVAS_WIDTH * ZOOM_LEVEL;
    this.canvas.height = CANVAS_HEIGHT * ZOOM_LEVEL;
    element.style.width = `${this.canvas.width}px`;
    if (!display) {
      this.hideCanvas();
    }
    this.canvas = element.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.toggleSmoothingZoom(false);
    this.context.scale(ZOOM_LEVEL * this.zoom, ZOOM_LEVEL * this.zoom);
    this.canvasPosition = { x: 0, y: 0 };
  }

  /**
   * Draw image in canvas
   * @param sx
   * @param sy
   * @param sWidth
   * @param sHeight
   * @param dx
   * @param dy
   * @param dWidth
   * @param dHeight
   */
  drawImage(
    sx: number,
    sy: number,
    sWidth: number,
    sHeight: number,
    dx: number,
    dy: number,
    dWidth: number,
    dHeight: number,
  ) {
    drawImage(
      this.context,
      this.image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight,
    );
  }

  /**
   * Clear image in area
   * @param x
   * @param y
   * @param width
   * @param height
   */
  clearImage(x: number, y: number, width: number, height: number): void {
    cleanRect(this.context, x, y, width, height);
  }

  /**
   * Save canvas state
   */
  save(): void {
    this.context.save();
  }

  /**
   * Restore last canvas state
   */
  restore(): void {
    this.context.restore();
  }

  set canvasPosition({ x, y }: { x: number, y: number }): void {
    this.canvasPositionData = Object.assign({}, { x, y });
  }

  get canvasPosition() {
    return this.canvasPositionData;
  }

  /**
   * Delete canvas from DOM
   */
  deleteCanvas() {
    this.canvas.remove();
  }

  /**
   * translate to x, y
   * @param x
   * @param y
   */
  translate(x: number, y:number): void {
    translate(this.context, x / this.zoom, y / this.zoom);
  }

  /**
   * Generic method to translate canvas to battleground
   */
  translateToBattleground(): void {
    const x = -this.canvasPosition.x + BATTLEGROUND_COORD_X;
    const y = -this.canvasPosition.y + BATTLEGROUND_COORD_Y;
    this.translate(x, y);
    this.canvasPosition = { x: BATTLEGROUND_COORD_X, y: BATTLEGROUND_COORD_Y };
  }

  /**
   * Generic method to translate canvas to player hand
   */
  translateToPlayerHand(): void {
    const x = -this.canvasPosition.x + PLAYER_HAND_COORD_X;
    const y = -this.canvasPosition.y + PLAYER_HAND_COORD_Y;
    this.translate(x, y);
    this.canvasPosition = { x: PLAYER_HAND_COORD_X, y: PLAYER_HAND_COORD_Y };
  }
  /**
   * Reset canvas to initial position
   */
  resetCanvasPosition(): void {
    this.translate(-this.canvasPosition.x, -this.canvasPosition.y);
    this.canvasPosition = { x: 0, y: 0 };
  }

  /**
   * toggle smooth zooming on canvas
   * @param checked
   */
  toggleSmoothingZoom(checked: boolean): void {
    this.context.imageSmoothingEnabled = checked;
  }

  hideCanvas() {
    this.canvas.classList.add('hidden');
  }

  showCanvas() {
    this.canvas.classList.remove('hidden');
  }

  dimCanvas() {
    this.canvas.classList.add('dimmed');
  }

  undimCanvas() {
    this.canvas.classList.remove('dimmed');
  }

  setZoom(zoom: number) {
    // scale to original size
    this.context.scale(1 / (ZOOM_LEVEL * this.zoom), 1 / (ZOOM_LEVEL * this.zoom));
    this.zoom = zoom;
    // scale to the new size
    this.context.scale(ZOOM_LEVEL * this.zoom, ZOOM_LEVEL * this.zoom);
  }
}
