import { connect } from "react-redux";

import { randomId } from "../../lib/randomId";
import { randomItem } from "../../lib/randomItem";
import { addTilesToPlayerHand, getAllPlayerIds } from "../../store";
import { EnhancedDebugBar } from "./DebugBar";

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { state } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    addTilesToHand: () => {
      const allPlayers = getAllPlayerIds(state);
      const playerId = randomItem(allPlayers);

      // TODO: Replace with data coming from the DebugBar form
      dispatch(
        addTilesToPlayerHand(playerId, [
          randomId(1, 2),
          randomId(1, 2),
          randomId(1, 2),
        ]),
      );
    },
  };
}

const enhance = connect(
  state => ({ state }),
  dispatch => ({ dispatch }),
  mergeProps,
);

export default enhance(EnhancedDebugBar);
