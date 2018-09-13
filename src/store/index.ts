import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducer";

export function configureStore(initialState = {}) {
  const store: any = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(),
  );

  return store;
}

export * from "./reducer";
