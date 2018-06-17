// @flow

import type { GridPosition } from '../../type/canvas';
import Canvas from '../canvas';
import Card from './card';
import AnimationSprite from '../../engine/animations';
import type { Tile } from '../../type/tile';
import type { Store } from '../../type/store';

export default class Stone extends Card {
  stone: Tile;
  animation: AnimationSprite;
  event: EventTarget;
  callback: Function;
  animationFinished: boolean;

  constructor({
    gridPosition,
    canvas,
    stone,
    store,
  }: {
    gridPosition: GridPosition,
    canvas?: Canvas,
    stone: Tile,
    store: Store,
  }) {
    super({
      gridPosition,
      canvas,
      store,
    });
    this.event = new EventTarget();
    this.stone = stone;
    this.animation = new AnimationSprite(this.stoneCardAnimation.bind(this), (1000 / 60));
    this.setZoom(1.5);
    this.translateCardToBattlegroundGrid();
    this.animateStoneCard();
    return this;
  }

  /**
   * Call to draw stone tile
   */
  drawStone() {
    this.drawCard(this.gridPosition, this.stone);
  }

  /**
   * Function that execute stone animation
   * @returns {boolean}
   */
  stoneCardAnimation() {
    if (this.zoom <= 1) {
      this.cancelAnimation();
      this.animationFinished = true;
    } else {
      const nextZoom = Number((this.zoom - 0.06).toFixed(2));
      this.clearCard();
      this.setZoom(nextZoom <= 1 ? 1 : nextZoom);
      this.drawStone();
    }
  }

  /**
   * Call to start stone animation
   */
  animateStoneCard() {
    this.animationFinished = false;
    this.animation.startAnimation();
  }

  /**
   * Call to end stone animation
   */
  cancelAnimation() {
    this.animation.stopAnimation();
    this.event.dispatchEvent(new CustomEvent('animation.finished'));
  }

  /**
   * Call to trigger callback when stone animation end
   * @param callback
   */
  onAnimationFinished(callback: Function) {
    this.callback = () => {
      callback();
      this.off();
    };
    this.event.addEventListener('animation.finished', this.callback);
  }

  /**
   * Remove event listener on 'animation.finished'
   */
  off() {
    this.event.removeEventListener('animation.finished', this.callback);
  }

  /**
   * Change card to battleground grid
   */
  translateCardToBattlegroundGrid() {
    this.clearCard();
    this.translateToBattleground();
    this.animateStoneCard();
  }
}
