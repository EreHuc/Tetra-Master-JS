import * as React from "react";

import { compose, defaultProps, lifecycle } from "recompose";
import Board from "../Board";
import DebugBar from "../DebugBar";
import PlayerHand from "../PlayerHand";
import "./App.css";

type AppProps = {
  initialized: boolean;
  initGame: () => void;
};

const withStartGameOnMount = lifecycle<AppProps, {}>({
  componentDidMount() {
    const { initGame } = this.props;

    initGame();
  },
});

const withDefaultProps = defaultProps({
  initGame: () => {},
});

export const App: React.SFC<AppProps> = ({ initialized }) => (
  <div>
    <DebugBar initialized={initialized} />
    {initialized && <Board />}
    {initialized && <PlayerHand playerId="1" />}
    {initialized && <PlayerHand playerId="2" />}
  </div>
);

export const EnhancedApp = compose(
  withStartGameOnMount,
  withDefaultProps,
)(App);
