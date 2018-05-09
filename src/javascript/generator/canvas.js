// @flow

import common from '../common/common';

export default class Canvas {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  image: HTMLImageElement;

  constructor(type: string, width: number, height: number, image: HTMLImageElement) {
    const body: HTMLElement = (document.querySelector('body'): any);
    const canvasId: string = common.namedId('canvas');
    this.image = image;
    this.canvas = document.createElement('canvas');
    this.canvas.classList.add(type);
    this.canvas.setAttribute('id', canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas = body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
  }

  /**
   * Draw image in canvas
   * @param image
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
    common.drawImage(
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
   * Save canvas state
   */
  save() {
    this.context.save();
  }

  /**
   * Restore last canvas state
   */
  restore() {
    this.context.restore();
  }
}
