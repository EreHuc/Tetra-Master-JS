import { connect } from "react-redux";

import { initBoard } from "../../store";
import { EnhancedDebugBar } from "./DebugBar";

// const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = {
  startGame: () => initBoard(3, 3),
};

const enhance = connect(
  null,
  mapDispatchToProps,
);

export default enhance(EnhancedDebugBar);
