import { connect } from "react-redux";

import { getBoardGrid, placeCurrentPlayerTile } from "../../store";
import { Board } from "./Board";

const mapStateToProps = state => ({
  grid: getBoardGrid(state),
});

const handleCellClick = dispatch => position => {
  dispatch(placeCurrentPlayerTile(position));
};

const mapDispatchToProps = dispatch => ({
  onCellClick: handleCellClick(dispatch),
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(Board);
