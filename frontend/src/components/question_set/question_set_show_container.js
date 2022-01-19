import { connect } from "react-redux";
import { fetchQuestionSet } from "../../actions/question_set_actions";
import { fetchUser } from "../../actions/user_actions";
import { fetchSetQuestions } from "../../actions/question_actions";
import QuestionSetShow from "./question_set_show";

const mSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    users: state.entities.users,
    questionSet: state.entities.questionSets[ownProps.match.params.id],
    questions: Object.values(state.entities.questions)
});

const mDTP = dispatch => ({
    fetchQuestionSet: (questionSetId) => dispatch(fetchQuestionSet(questionSetId)),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchSetQuestions: (setId) => dispatch(fetchSetQuestions(setId))
});

export default connect(mSTP, mDTP)(QuestionSetShow);