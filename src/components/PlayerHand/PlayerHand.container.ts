import { connect } from "react-redux";

import { Id } from "../../models";
import { focusHandTile, getPlayer, selectHandTile } from "../../store";
import { PlayerHand, TileEventFn } from "./PlayerHand";

type OwnProps = {
  playerId: Id;
};
type MergeProps = {
  tileIds: Id[];
  focusedTileId?: Id;
  selectedTileId?: Id;
  onTileMouseEnter: TileEventFn;
  onTileMouseLeave: TileEventFn;
  onTileClick: TileEventFn;
};

const mergeProps = (
  stateProps,
  dispatchProps,
  ownProps: OwnProps,
): MergeProps => {
  const { state } = stateProps;
  const { dispatch } = dispatchProps;
  const { playerId } = ownProps;

  const player = getPlayer(playerId)(state);

  return {
    tileIds: player ? player.hand : [],
    focusedTileId: player && player.focusedTileId,
    selectedTileId: player && player.selectedTileId,
    onTileMouseEnter: ({ tileId }) => {
      dispatch(focusHandTile(playerId, tileId));
    },
    onTileMouseLeave: ({ tileId }) => {
      dispatch(focusHandTile(playerId, null));
    },
    onTileClick: ({ tileId }) => {
      dispatch(selectHandTile(playerId, tileId));
    },
  };
};

const enhance = connect(
  state => ({ state }),
  dispatch => ({ dispatch }),
  mergeProps,
);

export default enhance(PlayerHand);
