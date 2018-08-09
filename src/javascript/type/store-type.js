// @flow

export type Action = {
  type: string;
  payload: any;
}

export type State = {
  gameCanStart: boolean;
  displayPlayerHandCursor: boolean;
  enemyHandAnimation: boolean;
  stoneAnimation: boolean;
  coinFlipped: boolean;
}

export type Reducer<T> = (state: T, action: Action) => T;

export type Store = {
  getState: Function,
  subscribe: Function,
  dispatch: Function,
}

export type StoreConstructor = (reducers: Object, initialState: State) => Store;
