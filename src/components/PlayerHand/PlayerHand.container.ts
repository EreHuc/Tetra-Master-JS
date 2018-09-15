import { connect } from "react-redux";

import { Id } from "../../models";
import { getPlayerHandAtIndex, RootState } from "../../store";
import { PlayerHand } from "./PlayerHand";

type OwnProps = {
  playerIndex: number;
};
type StateProps = {
  tiles: Id[];
};

const mapStateToProps = (state: RootState, ownProps): StateProps => ({
  tiles: getPlayerHandAtIndex(ownProps.playerIndex)(state),
});

const enhance = connect<StateProps, any, OwnProps>(mapStateToProps);

export default enhance(PlayerHand);
