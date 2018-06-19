// @flow

// $FlowFixMe
import CursorSound from '../../assets/sound/snd_cursor.mp3';
// $FlowFixMe
import ErrorSound from '../../assets/sound/snd_error.mp3';
// $FlowFixMe
import EscapeSound from '../../assets/sound/snd_escape.mp3';
// $FlowFixMe
import PutSound from '../../assets/sound/snd_put.mp3';
// $FlowFixMe
import ChooseCardSound from '../../assets/sound/snd_choose_card.mp3';
// $FlowFixMe
import QuadmistMusic from '../../assets/sound/mus_quadmist.mp3';

// $FlowFixMe Stupid flow didn't recognise Audio...
const cursorSound = new Audio(CursorSound);
const errorSound = new Audio(ErrorSound);
const escapeSound = new Audio(EscapeSound);
const putSound = new Audio(PutSound);
const chooseCardSound = new Audio(ChooseCardSound);
const quadmist = new Audio(QuadmistMusic);

export default class Sounds {
  cursorSound: HTMLAudioElement;
  quadmist: HTMLAudioElement;
  errorSound: HTMLAudioElement;
  escapeSound: HTMLAudioElement;
  putSound: HTMLAudioElement;
  chooseCardSound: HTMLAudioElement;

  constructor() {
    this.cursorSound = cursorSound;
    this.quadmist = quadmist;
    this.errorSound = errorSound;
    this.escapeSound = escapeSound;
    this.putSound = putSound;
    this.chooseCardSound = chooseCardSound;
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
    const sound: HTMLAudioElement = this.putSound.cloneNode();
    sound.play();
  }

  chooseCard() {
    const sound: HTMLAudioElement = this.chooseCardSound.cloneNode();
    sound.play();
  }
}
