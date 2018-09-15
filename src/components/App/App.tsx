import * as React from "react";

import { compose, defaultProps, lifecycle } from "recompose";
import Board from "../Board";
import DebugBar from "../DebugBar";
import PlayerHand from "../PlayerHand";
import "./App.css";

type AppProps = {
  initialized: boolean;
  startGame?: () => void;
};

const withStartGameOnMount = lifecycle<{ startGame: () => void }, {}>({
  componentDidMount() {
    this.props.startGame();
  },
});

const withDefaultProps = defaultProps({ startGame: () => {} });

export const App: React.SFC<AppProps> = ({ initialized }) => (
  <div>
    <DebugBar initialized={initialized} />
    {initialized && <Board />}
    {initialized && <PlayerHand playerIndex="1" />}
    {initialized && <PlayerHand playerIndex="2" />}
  </div>
);

export const EnhancedApp = compose(
  withStartGameOnMount,
  withDefaultProps,
)(App);
