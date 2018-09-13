import { connect } from "react-redux";

import { getBoard, placeTile } from "../../store";
import { Board } from "./";

const mapStateToProps = state => ({
  board: getBoard(state),
});

const mapDispatchToProps = dispatch => ({
  onCellClick: position => dispatch(placeTile(position)),
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(Board);
