import { connect } from "react-redux";
import GameChat from "./game_chat"
import { withRouter } from "react-router-dom";

const mSTP = (state, ownProps) => ({
    socket: ownProps.socket,
    state
});

export default withRouter(connect(mSTP)(GameChat));