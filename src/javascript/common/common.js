// @flow

/**
 * Generate a random ID
 * @returns {string}
 */
const randId = (): string => Math.random().toString(16).substring(2);

/**
 * Generate an id with prefix and length
 * @param prefix
 * @param length
 * @returns {string}
 */
const namedId = (prefix: string, length: number = 4): string => `${prefix}-${randId().substring(0, length)}`;

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
const drawImage = (
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
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

export default {
  randId,
  namedId,
  drawImage,
};
