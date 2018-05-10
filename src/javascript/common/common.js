// @flow

import { ZOOM_LEVEL } from './variables';

/**
 * Draw image in a specified context
 * @param ctx
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
export const drawImage = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sx: number,
  sy: number,
  sWidth: number,
  sHeight: number,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
): void => {
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx * ZOOM_LEVEL, dy * ZOOM_LEVEL, dWidth * ZOOM_LEVEL, dHeight * ZOOM_LEVEL);
};

/**
 * Clear rectangular area in a specific context
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 */
export const cleanRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void => {
  ctx.clearRect(x * ZOOM_LEVEL, y * ZOOM_LEVEL, width * ZOOM_LEVEL, height * ZOOM_LEVEL);
};

/**
 * translate canvas to x, y coordinate
 * @param ctx
 * @param x
 * @param y
 */
export const translate = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
  ctx.translate(x * ZOOM_LEVEL, y * ZOOM_LEVEL);
};

/**
 * Convert base 10 stat to first hexadecimal characters
 * @param stat
 * @returns {string}
 */
export const statToHexChar = (stat: number): string => {
  const hexChar = stat.toString(16);
  return hexChar.length > 1 ? stat.toString(16).substring(0, 1).toUpperCase() : '0';
};
