import { connect } from "react-redux";

import { randomId } from "../../lib/randomId";
import { Vector2 } from "../../models";
import { addTilesToHand, initBoard } from "../../store";
import { EnhancedDebugBar } from "./DebugBar";

const mapDispatchToProps = {
  startGame: () => initBoard(new Vector2(3, 3)),
  addTilesToHand: () =>
    // TODO: Replace with data coming from the DebugBar form
    addTilesToHand(randomId(1, 2), [
      randomId(1, 2),
      randomId(1, 2),
      randomId(1, 2),
    ]),
};

const enhance = connect(
  null,
  mapDispatchToProps,
);

export default enhance(EnhancedDebugBar);
