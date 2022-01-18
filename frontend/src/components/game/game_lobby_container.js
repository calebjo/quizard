import { connect } from "react-redux";
import GameLobby from "./game_lobby"
import { Link } from "react-router-dom";

import { fetchSetQuestions } from "../../actions/question_actions";

const mSTP = state => ({
    state
});

const mDTP = dispatch => ({
    fetchSetQuestions: (setId) => dispatch(fetchSetQuestions)
});

export default connect(mSTP, mDTP)(GameLobby);