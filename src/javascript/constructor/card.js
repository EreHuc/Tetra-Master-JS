import Canvas from '../generator/canvas';

export default class Card {
  constructor() {
    console.log('card.js:3 - ', 'card created');
    this.canvas = new Canvas('card');
    this.card = new Image();
    this.card.src = '';
  }
}
