import { connect } from "react-redux";

import { getBoard } from "../../store";
import { Board } from "./";

const mapStateToProps = (state, props) => ({
  board: getBoard(state),
});

const enhance = connect(mapStateToProps);

export default enhance(Board);
