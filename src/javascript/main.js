/* eslint-disable */
// @flow
import Card from './constructor/card/card';
import { BLUE_CARD, FLEXIBLE_BATTLE_CLASS } from './common/variables';
// import Board from './constructor/board/board';
import { monsterList } from './constructor/card/card-tile';

window.addEventListener('load', () => {
  // new Board();
  let monsterArr = [];
  Object.keys(monsterList).forEach((monster) => {
    monsterArr = [...monsterArr, new Card(BLUE_CARD, monsterList[monster])];
  });

  let flexMonster = monsterArr.find(card => card.stats.type === FLEXIBLE_BATTLE_CLASS);
  console.log('main.js:14 - ', monsterArr);
  console.log('main.js:17 - ', flexMonster);
});

