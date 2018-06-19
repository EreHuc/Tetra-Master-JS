/* eslint-disable */
// @flow
import 'babel-polyfill';

import Game from './engine/engine';
import { createStore } from './store/store';
import reducers from './store/reducers';
import initialState from './store/state';

window.addEventListener('load', () => {
  const store = createStore(reducers, initialState);
  const game = new Game({ store });
  console.log('main.js:7 - ', game);
});

