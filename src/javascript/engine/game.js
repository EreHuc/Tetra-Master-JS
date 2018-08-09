// @flow

import Engine from './engine';
import type { Store } from '../type/store-type';
import { GAME_STARTED } from '../store/actions';

export default class Game extends Engine {
  constructor({ store }:{store: Store}) {
    super({ store });
    this.store.subscribe(({ action }) => {
      if (action.type === GAME_STARTED) {

      }
    });
  }
}
