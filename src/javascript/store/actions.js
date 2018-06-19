import type { Store } from '../type/store-type';

export const gameCanStartDispatch = ({ store }:{store: Store}) => {
  const action = {
    type: 'GAME_STARTED',
  };

  store.dispatch(action);
};

export const stoneCardAnimationDisptach = ({ store }:{store: Store}) => {
  const action = {
    type: 'STONE_ANIMATION_FINISHED',
  };
  const state = store.getState();

  store.dispatch(action);

  if (state.enemyHandAnimation && !state.gameCanStart) {
    gameCanStartDispatch({ store });
  }
};

export const enemyHandAnimationDispatch = ({ store }:{store: Store}) => {
  const action = {
    type: 'ENEMY_HAND_ANIMATION_FINISHED',
  };
  const state = store.getState();

  store.dispatch(action);
  if (state.stoneAnimation && !state.gameCanStart) {
    gameCanStartDispatch({ store });
  }
};
