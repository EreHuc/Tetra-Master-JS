import { connect } from "react-redux";

import { initBoard } from "../../store";
import { Vector2 } from "../../Vector2";
import { EnhancedDebugBar } from "./DebugBar";

// const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = {
  startGame: () => initBoard(new Vector2(3, 3)),
};

const enhance = connect(
  null,
  mapDispatchToProps,
);

export default enhance(EnhancedDebugBar);
