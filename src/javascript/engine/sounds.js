// @flow

// $FlowFixMe
import cursorSound from '../../assets/sound/snd_cursor.mp3';
// $FlowFixMe
import errorSound from '../../assets/sound/snd_error.mp3';
// $FlowFixMe
import escapeSound from '../../assets/sound/snd_escape.mp3';
// $FlowFixMe
import putSound from '../../assets/sound/snd_put.mp3';
// $FlowFixMe
import quadmistMusic from '../../assets/sound/mus_quadmist.mp3';

export default class Sounds {
  cursorSound: HTMLAudioElement;
  quadmist: HTMLAudioElement;
  errorSound: HTMLAudioElement;
  escapeSound: HTMLAudioElement;
  putSound: HTMLAudioElement;

  constructor() {
    // $FlowFixMe
    this.cursorSound = new Audio(cursorSound);
    this.quadmist = new Audio(quadmistMusic);
    this.errorSound = new Audio(errorSound);
    this.escapeSound = new Audio(escapeSound);
    this.putSound = new Audio(putSound);
  }

  cursor() {
    const sound: HTMLAudioElement = this.cursorSound.cloneNode();
    sound.play();
  }

  music() {
    this.quadmist.loop = true;
    this.quadmist.play();
  }

  error() {
    const sound: HTMLAudioElement = this.errorSound.cloneNode();
    sound.play();
  }

  escape() {
    const sound: HTMLAudioElement = this.escapeSound.cloneNode();
    sound.play();
  }

  put() {
    this.putSound.play();
  }
}
