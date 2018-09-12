import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const rootState = state => state;

export function configureStore(initialState = {}) {
  const store: any = createStore(
    rootState,
    initialState,
    composeWithDevTools(),
  );

  return store;
}
