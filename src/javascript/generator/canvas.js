// @flow

export default class Canvas {
  constructor(type: string) {
    console.log('canvas.js:5 - ', 'new canvas');
    const canvas = document.createElement('canvas');
    canvas.classList.add(type);
  }
}
