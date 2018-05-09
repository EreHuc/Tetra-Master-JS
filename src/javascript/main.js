// @flow
import Card from './constructor/card/card';
import { BLUE_CARD } from './common/variables';
import Board from './constructor/board/board';
import { Chocobo } from './constructor/card/monster-tile';

window.addEventListener('load', () => {
  const board = new Board();
  const card = new Card(BLUE_CARD, Chocobo);
  console.log('main.js:10 - ', board);
  console.log('main.js:7 - ', card);
});

