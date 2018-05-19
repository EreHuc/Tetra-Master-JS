// @flow

import { cleanRect, drawImage, translate } from '../common/common';
import { namedId } from '../common/generator/random-generator';
import {
  BATTLEGROUND_COORD_X,
  BATTLEGROUND_COORD_Y,
  CANVAS_HEIGHT,
  CANVAS_WIDTH, PLAYER_HAND_COORD_X, PLAYER_HAND_COORD_Y,
  ZOOM_LEVEL,
} from '../common/variables';
import type { CoordPosition } from '../type/canvas';

export default class Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;
  canvasPosition: CoordPosition;
  zoom: number;

  constructor(type: string, image: HTMLImageElement, display: boolean = true, zoom: number = 1) {
    const body: HTMLBodyElement = (document.querySelector('body'): any);
    const canvasId: string = namedId('canvas');
    this.zoom = zoom;
    this.image = image;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add('tetra-master', type);
    this.canvas.setAttribute('id', canvasId);
    this.canvas.width = CANVAS_WIDTH * ZOOM_LEVEL;
    this.canvas.height = CANVAS_HEIGHT * ZOOM_LEVEL;
    if (!display) {
      this.hideCanvas();
    }
    this.canvas = body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    this.toggleSmoothingZoom(false);
    this.context.scale(ZOOM_LEVEL * this.zoom, ZOOM_LEVEL * this.zoom);
    this.canvasPosition = {
      x: 0,
      y: 0,
    };
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

  /**
   * Set canvas position
   * @param x
   * @param y
   */
  setCanvasPosition(x: number, y: number): void {
    this.canvasPosition = Object.assign({}, { x, y });
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
    this.setCanvasPosition(BATTLEGROUND_COORD_X, BATTLEGROUND_COORD_Y);
  }

  /**
   * Generic method to translate canvas to player hand
   */
  translateToPlayerHand(): void {
    const x = -this.canvasPosition.x + PLAYER_HAND_COORD_X;
    const y = -this.canvasPosition.y + PLAYER_HAND_COORD_Y;
    this.translate(x, y);
    this.setCanvasPosition(PLAYER_HAND_COORD_X, PLAYER_HAND_COORD_Y);
  }
  /**
   * Reset canvas to initial position
   */
  resetCanvasPosition(): void {
    this.translate(-this.canvasPosition.x, -this.canvasPosition.y);
    this.setCanvasPosition(0, 0);
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
    this.context.scale(1 / (ZOOM_LEVEL * this.zoom), 1 / (ZOOM_LEVEL * this.zoom));
    this.zoom = zoom;
    this.context.scale(ZOOM_LEVEL * this.zoom, ZOOM_LEVEL * this.zoom);
  }
}
