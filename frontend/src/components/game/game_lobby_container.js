import { connect } from "react-redux";
import GameLobby from "./game_lobby"
import { Link } from "react-router-dom";

import { fetchSetQuestions } from "../../actions/question_actions";
import { fetchLobby } from "../../actions/lobby_actions";


const mSTP = (state) => ({
    currentUser: state.session.user,
    state
});

const mDTP = dispatch => ({
    fetchSetQuestions: (setId) => dispatch(fetchSetQuestions(setId)),
    fetchLobby: (roomId) => dispatch(fetchLobby(roomId))
});

export default connect(mSTP, mDTP)(GameLobby);