import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { fetchUserQuestionSets } from "../../actions/question_set_actions";
import UserShow from "./user_show";
import { createLobby } from "../../actions/lobby_actions";
import { withRouter } from "react-router-dom";

const mSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    viewedUser: state.entities.users[ownProps.match.params.id],
    questionSets: Object.values(state.entities.questionSets)
});

const mDTP = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchUserQuestionSets: (userId) => dispatch(fetchUserQuestionSets(userId)),
    createLobby: (lobbyData) => dispatch(createLobby(lobbyData))
});

export default withRouter(connect(mSTP, mDTP)(UserShow));