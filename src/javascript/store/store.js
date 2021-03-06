/* eslint-disable no-param-reassign */
// @flow

import type { Action, Reducer, State, StoreConstructor } from '../type/store-type';

const combineReducer = (reducers: Object, initialState: State): Reducer<any> => (state, action) => Object.keys(reducers).reduce((nextState, key) => {
  nextState[key] = reducers[key](state[key], action);
  return nextState;
}, initialState);

export const createStore: StoreConstructor = (reducers, initialState) => {
  const rootReducer = combineReducer(reducers, initialState);
  const listeners: Array<Function> = [];
  let currentState = initialState;

  const getState = () => Object.assign({}, currentState);

  const subscribe = (listener: Function) => listeners.push(listener);

  const dispatch = (action: Action) => {
    currentState = rootReducer(currentState, action);
    listeners.forEach(listener => listener({ action, state: currentState }));
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};
