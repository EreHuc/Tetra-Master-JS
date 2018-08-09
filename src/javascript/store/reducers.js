/* eslint-disable no-param-reassign */
// @flow

import type { Reducer } from '../type/store-type';
import {
  COIN_FLIPPED,
  ENEMY_HAND_ANIMATION_FINISHED,
  GAME_STARTED,
  HIDE_CURSOR,
  SHOW_CURSOR,
  STONE_ANIMATION_FINISHED,
} from './actions';

const stoneAnimation: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case STONE_ANIMATION_FINISHED:
      return true;
    default:
      return state;
  }
};

const enemyHandAnimation: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case ENEMY_HAND_ANIMATION_FINISHED:
      return true;
    default:
      return state;
  }
};

const gameCanStart: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case GAME_STARTED:
      return true;
    default:
      return state;
  }
};

const displayPlayerHandCursor: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case SHOW_CURSOR:
      return true;
    case HIDE_CURSOR:
      return false;
    default:
      return state;
  }
};

const coinFlipped: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case COIN_FLIPPED:
      return true;
    default:
      return state;
  }
};

export default {
  gameCanStart,
  displayPlayerHandCursor,
  enemyHandAnimation,
  stoneAnimation,
  coinFlipped,
};
