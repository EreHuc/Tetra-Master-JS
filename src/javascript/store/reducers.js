/* eslint-disable no-param-reassign */
// @flow

import type { Reducer } from '../type/store';

const stoneAnimation: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case 'STONE_ANIMATION_FINISHED':
      return true;
    default:
      return state;
  }
};

const enemyHandAnimation: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case 'ENEMY_HAND_ANIMATION_FINISHED':
      return true;
    default:
      return state;
  }
};

const gameCanStart: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case 'GAME_STARTED':
      return true;
    default:
      return state;
  }
};

const displayPlayerHandCursor: Reducer<boolean> = (state, action) => {
  switch (action.type) {
    case 'SHOW_CURSOR':
      return true;
    case 'HIDE_CURSOR':
      return false;
    default:
      return state;
  }
};
export default {
  gameCanStart,
  displayPlayerHandCursor,
  enemyHandAnimation,
  stoneAnimation,
};
