import { connect } from "react-redux";

import { getTile } from "../../store";
import { TileCard } from "./TileCard";

const mapStateToProps = (state, ownProps) => ({
  tile: getTile(ownProps.tileId)(state),
});

const enhance = connect(mapStateToProps);

export default enhance(TileCard);
