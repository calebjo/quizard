import { connect } from "react-redux";
import GameLobby from "./game_lobby"

import { fetchQuestionSet } from "../../actions/question_set_actions";
import { fetchSetQuestions } from "../../actions/question_actions";
import { fetchLobby } from "../../actions/lobby_actions";


const mSTP = (state, ownProps) => ({
    questionSets: state.entities.questionSets,
    lobby: state.entities.lobbies[ownProps.match.params.id],
    currentUser: state.session.user,
    questions: state.entities.questions,
    state
});

const mDTP = dispatch => ({
    fetchQuestionSet: (setId) => dispatch(fetchQuestionSet(setId)),
    fetchSetQuestions: (setId) => dispatch(fetchSetQuestions(setId)),
    fetchLobby: (roomId) => dispatch(fetchLobby(roomId))
});

export default connect(mSTP, mDTP)(GameLobby);