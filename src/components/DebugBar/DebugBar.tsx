import * as React from "react";

import "./DebugBar.css";

type DebugBarProps = {
  initialized: boolean;
};

const DebugBar: React.SFC<DebugBarProps> = ({ initialized }) => (
  <div className="debug-bar">
    <div>DEBUG BAR</div>
    <div />
    <div>
      Game initialized: <b>{initialized.toString()}</b>
    </div>
  </div>
);

export const EnhancedDebugBar = DebugBar;
