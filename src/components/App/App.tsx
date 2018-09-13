import * as React from "react";
import { Provider } from "react-redux";

import { configureStore } from "../../store";
import Board from "../Board";
import DebugBar from "../DebugBar";
import PlayerHand from "../PlayerHand";
import "./App.css";

const store = configureStore();

export const App = () => (
  <Provider store={store}>
    <>
      <DebugBar />
      <Board />
      <PlayerHand playerId="1" />
      <PlayerHand playerId="2" />
    </>
  </Provider>
);
