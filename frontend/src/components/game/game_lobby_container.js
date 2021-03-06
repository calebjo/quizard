import { connect } from "react-redux";
import GameLobby from "./game_lobby"

import { fetchQuestionSet } from "../../actions/question_set_actions";
import { fetchSetQuestions } from "../../actions/question_actions";
import { fetchLobby, deleteLobby } from "../../actions/lobby_actions";


const mSTP = (state, ownProps) => ({
    questionSets: state.entities.questionSets,
    lobby: state.entities.lobbies[ownProps.match.params.id],
    currentUser: state.session.user,
    state
});

const mDTP = dispatch => ({
    fetchQuestionSet: (setId) => dispatch(fetchQuestionSet(setId)),
    fetchSetQuestions: (setId) => dispatch(fetchSetQuestions(setId)),
    fetchLobby: (roomId) => dispatch(fetchLobby(roomId)),
    deleteLobby: (roomId) => dispatch(deleteLobby(roomId))
});

export default connect(mSTP, mDTP)(GameLobby);