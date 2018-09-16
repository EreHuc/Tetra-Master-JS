import { connect } from "react-redux";

import { randomId } from "../../lib/randomId";
import { getBoardGrid, placeTile } from "../../store";
import { Board } from "./Board";

const mapStateToProps = state => ({
  grid: getBoardGrid(state),
});

const mapDispatchToProps = dispatch => ({
  onCellClick: position => {
    // FIXME: Use the currentPlayerId and selectedTileId instead of random ids.
    dispatch(placeTile(randomId(1, 2), randomId(1, 2), position));
  },
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(Board);
