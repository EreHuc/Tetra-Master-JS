import { connect } from "react-redux";

import { Id } from "../../models";
import { getPlayerAtIndex, RootState } from "../../store";
import { PlayerHand } from "./PlayerHand";

type OwnProps = {
  playerIndex: number;
};
type StateProps = {
  tiles: Id[]; // TODO: Hydrate the tiles (instead of just passing the ids).
  focusedTile: Id;
};

const mapStateToProps = (state: RootState, ownProps): StateProps => {
  const player = getPlayerAtIndex(ownProps.playerIndex)(state);

  return {
    tiles: player.hand,
    focusedTile: player.focusedTile,
  };
};

const enhance = connect<StateProps, any, OwnProps>(mapStateToProps);

export default enhance(PlayerHand);
