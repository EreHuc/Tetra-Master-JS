// @flow

export const requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame;

/**
 * Generic function that start animation frame
 * @param callback
 * @param animationDuration
 */
export const startAnimation = (callback: Function, animationDuration: number = (1000 / 60)): void => {
  function rAF() {
    callback();
    window.setTimeout(() => {
      requestAnimationFrame(rAF);
    }, animationDuration);
  }

  requestAnimationFrame(rAF);
};
