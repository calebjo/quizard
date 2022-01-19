import { connect } from "react-redux";
import { fetchQuestionSet } from "../../actions/question_set_actions";
import { fetchSetQuestions } from "../../actions/question_actions";
import QuestionEditForm from "./question_edit_form";

const mSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    questionSet: state.entities.questionSets[ownProps.match.params.id],
    questions: Object.values(state.entities.questions)
});

const mDTP = dispatch => ({
    fetchQuestionSet: (questionSet) => dispatch(fetchQuestionSet(questionSet)),
    fetchSetQuestions: (setId) => dispatch(fetchSetQuestions(setId))
});

export default connect(mSTP, mDTP)(QuestionEditForm);