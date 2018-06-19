// @flow

import type { Store } from '../../type/store-type';
import Card from './card-constructor';
import type { EnemyHandPosition } from '../../type/canvas-type';
import Canvas from '../canvas-constructor';
import AnimationSprite from '../animations-constructor';
import { cardTiles } from '../../common/tiles/card-tiles';
import type { MonsterTile, Tile } from '../../type/tile-type';
import { CANVAS_HEIGHT } from '../../common/variables';

export default class EnemyHandCard extends Card {
  event: EventTarget;
  enterAnimation: AnimationSprite;
  selectAnimation: AnimationSprite;
  deselectAnimation: AnimationSprite;
  monster: MonsterTile;
  tile: Tile;
  y: number;
  animationFinished: boolean;
  callback: Function;
  currentAnimation: 'enter' | 'select' | 'deselect' | null;
  currentDx: number;
  selectPositionX: number;
  deselectPositionX: number;

  constructor({
    store,
    gridPosition,
    canvas,
    monster,
  }:{store: Store, gridPosition: EnemyHandPosition, canvas?: Canvas, monster: MonsterTile}) {
    super({ store, gridPosition, canvas });
    this.event = new EventTarget();
    this.selectAnimation = new AnimationSprite(this.selectAnimationFrame.bind(this), (1000 / 60));
    this.deselectAnimation = new AnimationSprite(this.deselectAnimationFrame.bind(this), (1000 / 60));
    // $FlowFixMe
    this.enterAnimation = new AnimationSprite(this.enterAnimationFrame.bind(this), (1000 / 60));
    this.monster = monster;
    this.tile = cardTiles.back;
    this.y = this.gridPosition.y;
    this.selectPositionX = this.gridPosition.x + this.gridPosition.select.dx;
    this.deselectPositionX = this.gridPosition.x;
    this.animationFinished = false;
    this.drawEnemyCard();
    this.animateEnemyCardEnter();
    return this;
  }

  drawEnemyCard() {
    this.drawCard(this.gridPosition, this.tile);
  }

  enterAnimationFrame() {
    let y;
    if (this.gridPosition.y <= this.y) {
      ({ y } = this);
      this.cancelAnimation();
    } else {
      y = this.gridPosition.y - 19;
    }
    this.gridPosition = {
      x: this.gridPosition.x,
      y: y <= this.y ? this.y : y,
      value: this.gridPosition.value,
      select: this.gridPosition.select,
    };
    this.drawEnemyCard();
  }

  selectAnimationFrame() {
    if (this.currentDx <= this.selectPositionX) {
      this.currentDx += 5;
    } else {
      this.currentDx = this.selectPositionX;
      this.cancelAnimation();
    }
    this.gridPosition = {
      x: this.currentDx <= this.selectPositionX ? this.currentDx : this.selectPositionX,
      y: this.gridPosition.y,
      value: this.gridPosition.value,
      select: this.gridPosition.select,
    };
    this.drawEnemyCard();
  }

  deselectAnimationFrame() {
    if (this.currentDx >= this.deselectPositionX) {
      this.currentDx -= 5;
    } else {
      this.currentDx = this.deselectPositionX;
      this.cancelAnimation();
    }
    this.gridPosition = {
      x: this.currentDx >= this.deselectPositionX ? this.currentDx : this.deselectPositionX,
      y: this.gridPosition.y,
      value: this.gridPosition.value,
      select: this.gridPosition.select,
    };
    this.drawEnemyCard();
  }

  /**
   * Call to start stone animation
   */
  animateEnemyCardEnter() {
    if (!this.currentAnimation) {
      this.animationFinished = false;
      this.currentAnimation = 'enter';
      this.gridPosition = {
        x: this.gridPosition.x,
        y: CANVAS_HEIGHT,
        value: this.gridPosition.value,
        select: this.gridPosition.select,
      };
      this.enterAnimation.startAnimation();
    }
  }

  animateEnemyCardSelect() {
    if (!this.currentAnimation) {
      this.animationFinished = false;
      this.currentAnimation = 'select';
      this.currentDx = this.deselectPositionX;
      this.gridPosition = {
        x: this.currentDx,
        y: this.gridPosition.y,
        value: this.gridPosition.value,
        select: this.gridPosition.select,
      };
      this.drawEnemyCard();
      this.selectAnimation.startAnimation();
    }
  }

  animateEnemyCardDeselect() {
    if (!this.currentAnimation) {
      this.animationFinished = false;
      this.currentAnimation = 'deselect';
      this.currentDx = this.selectPositionX;
      this.gridPosition = {
        x: this.currentDx,
        y: this.gridPosition.y,
        value: this.gridPosition.value,
        select: this.gridPosition.select,
      };
      this.drawEnemyCard();
      this.deselectAnimation.startAnimation();
    }
  }

  /**
   * Call to end stone animation
   */
  cancelAnimation() {
    if (this.currentAnimation) {
      this.event.dispatchEvent(new CustomEvent(`${this.currentAnimation}.finished`));
      switch (this.currentAnimation) {
        case 'enter':
          this.enterAnimation.stopAnimation();
          break;
        case 'select':
          this.selectAnimation.stopAnimation();
          break;
        case 'deselect':
          this.deselectAnimation.stopAnimation();
          break;
        default:
      }
      this.currentAnimation = null;
    }
  }

  /**
   * Call to trigger callback when stone animation end
   * @param callback
   */
  onAnimationFinished(callback: Function) {
    if (this.currentAnimation) {
      this.callback = () => {
        callback();
        this.off();
      };
      this.event.addEventListener(`${this.currentAnimation}.finished`, this.callback);
    }
  }

  /**
   * Remove event listener on 'animation.finished'
   */
  off() {
    if (this.currentAnimation) {
      this.event.removeEventListener(`${this.currentAnimation}.finished`, this.callback);
    }
  }
}
