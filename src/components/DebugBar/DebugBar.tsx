import * as React from "react";
import { compose, lifecycle } from "recompose";

import "./DebugBar.css";

type DebugBarProps = {
  initialized: boolean;
  startGame: () => void;
  addTilesToHand: () => void;
};

const withLifecycle = lifecycle<DebugBarProps, {}>({
  componentDidMount() {
    const { initialized, addTilesToHand } = this.props;
    if (initialized) {
      addTilesToHand();
    }
  },
});

const DebugBar: React.SFC<DebugBarProps> = ({
  initialized,
  addTilesToHand,
}) => (
  <div className="debug-bar">
    <div>DEBUG BAR</div>
    {/* TODO: Create a simple formt to select players and tiles */}
    <button onClick={addTilesToHand}>Add tiles to hand</button>
    <div />
    <div>
      Game initialized: <b>{initialized.toString()}</b>
    </div>
  </div>
);

export const EnhancedDebugBar = compose(withLifecycle)(DebugBar);
