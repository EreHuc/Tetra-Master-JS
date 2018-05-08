// @flow
import Card from './constructor/card/card';
import { BLUE_CARD } from './common/variables';

window.addEventListener('load', () => {
  const card = new Card(BLUE_CARD);
  console.log('main.js:7 - ', card);
});

