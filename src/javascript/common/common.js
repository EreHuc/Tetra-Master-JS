// @flow

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
  ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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
