// @flow

import type { State } from '../type/store-type';

const initialState: State = {
  gameCanStart: false,
  displayPlayerHandCursor: false,
  enemyHandAnimation: false,
  stoneAnimation: false,
  coinFlipped: false,
};

export default initialState;
