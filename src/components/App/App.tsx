import * as React from "react";
import { Provider } from "react-redux";

import { configureStore } from "../../store";
import Board from "../Board";
import "./App.css";

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <Board />
  </Provider>
);
