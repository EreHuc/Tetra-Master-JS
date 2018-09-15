import { connect } from "react-redux";

import { getPlayerHandAtIndex } from "../../store";
import { PlayerHand } from "./PlayerHand";

const mapStateToProps = (state, ownProps) => ({
  tiles: getPlayerHandAtIndex(ownProps.playerIndex)(state),
});

const enhance = connect(mapStateToProps);

export default enhance(PlayerHand);
