// @flow

import type { Store } from '../type/store';

export class StoreClass {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  get state() {
    return this.store.getState();
  }
}
