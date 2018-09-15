import { connect } from "react-redux";

import { Vector2 } from "../../models";
import { addPlayer, initBoard } from "../../store";
import { EnhancedApp } from "./App";

// TODO: Store a specific boolean in the store for this.
// TODO: Move to the store
const isInitialized = state => {
  return state.board.grid.length > 0;
};

const mapStateToProps = state => {
  return {
    initialized: isInitialized(state),
  };
};

const mapDispatchToProps = dispatch => ({
  startGame: () => {
    dispatch(initBoard(new Vector2(3, 3)));
    dispatch(addPlayer({ name: "Player 1" }));
    dispatch(addPlayer({ name: "Player 2" }));
  },
});

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enhance(EnhancedApp);
