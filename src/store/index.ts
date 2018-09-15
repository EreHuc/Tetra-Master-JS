import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import immutableStateInvariantMiddleware from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

import rootReducer from "./root.reducer";

const middlewares = [
  immutableStateInvariantMiddleware(), // TODO: Enable only in development mode.
  thunk,
];

export function configureStore(initialState = {}) {
  const store: any = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );

  return store;
}

export * from "./root.reducer";
export * from "./board";
export * from "./players";
