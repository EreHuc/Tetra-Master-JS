// @flow

const requestAnimationFrame = window.requestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.msRequestAnimationFrame;

const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

export default class AnimationSprite {
  requestId: number;
  fpsInterval: number;
  now: number;
  elapsed: number;
  then: number;
  callback: Function;

  constructor(callback: Function, fpsInterval: number = (1000 / 60)) {
    this.fpsInterval = fpsInterval;
    this.callback = callback;
  }

  startAnimation(): void {
    this.then = Date.now();
    this.requestId = requestAnimationFrame(this.rAF.bind(this));
  }

  rAF(): void {
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    this.requestId = requestAnimationFrame(this.rAF.bind(this));
    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      this.stopAnimation(this.callback());
    }
  }

  stopAnimation(canStop: boolean): void {
    if (canStop) {
      cancelAnimationFrame(this.requestId);
    }
  }
}
