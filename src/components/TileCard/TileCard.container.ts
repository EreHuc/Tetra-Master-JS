import { connect } from "react-redux";

import { getTile } from "../../store";
import { TileCard } from "./TileCard";

const mapStateToProps = (state, ownProps) => ({
  tile: getTile(ownProps.tileId)(state),
});

const enhance = connect(mapStateToProps);

// @ts-ignore: Still having some issues with Redux and Typescript
export default enhance(TileCard);
