import type { Store } from '../type/store-type';

export const GAME_STARTED = 'GAME_STARTED';
export const STONE_ANIMATION_FINISHED = 'STONE_ANIMATION_FINISHED';
export const ENEMY_HAND_ANIMATION_FINISHED = 'ENEMY_HAND_ANIMATION_FINISHED';
export const SHOW_CURSOR = 'SHOW_CURSOR';
export const HIDE_CURSOR = 'HIDE_CURSOR';
export const COIN_FLIPPED = 'COIN_FLIPPED';
export const FLIP_COIN = 'FLIP_COIN';

export const gameCanStartDispatch = ({ store }:{store: Store}) => {
  const action = {
    type: GAME_STARTED,
  };

  store.dispatch(action);
};

export const flipCoinDispatch = ({ store }:{store: Store}) => {
  const action = {
    type: FLIP_COIN,
  };

  store.dispatch(action);
};

const gameCanStartHandler = ({ store }:{store: Store}) => {
  const state = store.getState();

  if (state.enemyHandAnimation && state.coinFlipped && state.stoneAnimation && !state.gameCanStart) {
    gameCanStartDispatch({ store });
  }
};

const coinCanBeFlippedHandler = ({ store }:{store: Store}) => {
  const state = store.getState();

  if (state.enemyHandAnimation && state.stoneAnimation) {
    flipCoinDispatch({ store });
  }
};

export const stoneCardAnimationDispatch = ({ store }:{store: Store}) => {
  const action = {
    type: STONE_ANIMATION_FINISHED,
  };
  store.dispatch(action);

  coinCanBeFlippedHandler({ store });
  gameCanStartHandler({ store });
};

export const enemyHandAnimationDispatch = ({ store }:{store: Store}) => {
  const action = {
    type: ENEMY_HAND_ANIMATION_FINISHED,
  };
  store.dispatch(action);

  coinCanBeFlippedHandler({ store });
  gameCanStartHandler({ store });
};

export const coinFlippedDispatch = ({ store, payload }:{store: Store}) => {
  const action = {
    type: COIN_FLIPPED,
    payload,
  };
  store.dispatch(action);

  gameCanStartHandler({ store });
};
