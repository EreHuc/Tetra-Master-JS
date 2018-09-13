import * as React from "react";
import { compose, lifecycle } from "recompose";

import "./DebugBar.css";

type DebugBarProps = {
  startGame: () => void;
};

const withStartGameOnMount = lifecycle<DebugBarProps, {}>({
  componentDidMount() {
    this.props.startGame();
  },
});

const DebugBar: React.SFC<DebugBarProps> = ({ startGame }) => (
  <div className="debug-bar">
    <button onClick={startGame}>Init game</button>
  </div>
);

export const EnhancedDebugBar = compose(withStartGameOnMount)(DebugBar);
