/* eslint-disable */
// @flow
import 'babel-polyfill';

import Game from './engine/engine';

window.addEventListener('load', () => {
  const game = new Game();
  console.log('main.js:7 - ', game);
});

