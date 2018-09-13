import * as React from "react";

import "./DebugBar.css";

export const DebugBar = ({ startGame }) => (
  <div className="debug-bar">
    <button onClick={startGame}>Init game</button>
  </div>
);
