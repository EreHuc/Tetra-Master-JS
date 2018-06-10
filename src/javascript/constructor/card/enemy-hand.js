// @flow

import type { Store } from '../../type/store';
import Card from './card';
import type { GridPosition } from '../../type/canvas';
import Canvas from '../canvas';
import AnimationSprite from '../../engine/animations';
import { cardTiles } from '../../common/tiles/card-tiles';
import type { MonsterTile, Tile } from '../../type/tile';
import { CANVAS_HEIGHT } from '../../common/variables';

export default class EnemyHandCard extends Card {
  event: EventTarget;
  animation: AnimationSprite;
  monster: MonsterTile;
  tile: Tile;
  y: number;
  animationFinished: boolean;
  callback: Function;

  constructor({
    store,
    gridPosition,
    canvas,
    monster,
  }:{store: Store, gridPosition: GridPosition, canvas?: Canvas, monster: MonsterTile}) {
    super({ store, gridPosition, canvas });
    this.event = new EventTarget();
    this.animation = new AnimationSprite(this.enterAnimation.bind(this), (1000 / 30));
    this.monster = monster;
    this.tile = cardTiles.back;
    this.y = this.gridPosition.y;
    this.animationFinished = false;
    this.drawEnemyCard();
    this.animateEnemyCard();
    return this;
  }

  drawEnemyCard() {
    this.drawCard(this.gridPosition, this.tile);
  }

  enterAnimation() {
    if (this.gridPosition.y <= this.y) {
      this.gridPosition = {
        x: this.gridPosition.x,
        y: this.y,
        value: this.gridPosition.value,
      };
      this.cancelAnimation();
    } else {
      const y = this.gridPosition.y - 38;
      this.gridPosition = {
        x: this.gridPosition.x,
        y: y <= this.y ? this.y : y,
        value: this.gridPosition.value,
      };
    }
    this.drawEnemyCard();
  }

  /**
   * Call to start stone animation
   */
  animateEnemyCard() {
    this.animationFinished = false;
    this.gridPosition = {
      x: this.gridPosition.x,
      y: CANVAS_HEIGHT,
      value: this.gridPosition.value,
    };
    this.animation.startAnimation();
  }

  /**
   * Call to end stone animation
   */
  cancelAnimation() {
    this.event.dispatchEvent(new CustomEvent('animation.finished'));
    this.animation.stopAnimation();
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
}
