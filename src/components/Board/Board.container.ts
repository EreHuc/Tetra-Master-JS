import { connect } from "react-redux";

import { randomId } from "../../lib/randomId";
import { getBoardGrid, placeTile } from "../../store";
import { Board } from "./Board";

const mapStateToProps = state => ({
  grid: getBoardGrid(state),
});

const mapDispatchToProps = dispatch => ({
  onCellClick: position => {
    dispatch(placeTile(position, randomId(1, 2)));
  },
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(Board);
