import * as React from "react";
import { compose, lifecycle } from "recompose";

import "./DebugBar.css";

type DebugBarProps = {
  startGame: () => void;
  addTilesToHand: () => void;
};

const withStartGameOnMount = lifecycle<DebugBarProps, {}>({
  componentDidMount() {
    this.props.startGame();
    this.props.addTilesToHand();
  },
});

const DebugBar: React.SFC<DebugBarProps> = ({ startGame, addTilesToHand }) => (
  <div className="debug-bar">
    <button onClick={startGame}>Start game</button>
    {/* TODO: Create a simple formt to select players and tiles */}
    <button onClick={addTilesToHand}>Add tiles to hand</button>
  </div>
);

export const EnhancedDebugBar = compose(withStartGameOnMount)(DebugBar);
