import { connect } from "react-redux";

import { getPlayerHand } from "../../store";
import { PlayerHand } from "./PlayerHand";

const mapStateToProps = (state, ownProps) => ({
  tiles: getPlayerHand(ownProps.playerId)(state),
});

const enhance = connect(mapStateToProps);

export default enhance(PlayerHand);
