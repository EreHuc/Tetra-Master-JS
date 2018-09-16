import { connect } from "react-redux";

import { getCurrentPlayer } from "../../store";
import { EnhancedDebugBar } from "./DebugBar";

const mapStateToProps = state => ({
  currentPlayer: getCurrentPlayer(state),
});

const enhance = connect(mapStateToProps);

export default enhance(EnhancedDebugBar);
