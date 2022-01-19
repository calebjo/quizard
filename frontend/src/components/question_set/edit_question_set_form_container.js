import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateQuestionSet, deleteQuestionSet, clearQsetErrors } from "../../actions/question_set_actions";
import EditQuestionSetForm from "./edit_question_set_form";

const mSTP = (state, ownProps) => ({
    currentUser: state.session.user,
    questionSet: state.entities.questionSets[ownProps.match.params.id],
    errors: state.errors.questionSet
});

const mDTP = dispatch => ({
    updateQuestionSet: (questionSet) => dispatch(updateQuestionSet(questionSet)),
    deleteQuestionSet: (setId) => dispatch(deleteQuestionSet(setId)),
    clearQsetErrors: () => dispatch(clearQsetErrors())
});

export default withRouter(connect(mSTP, mDTP)(EditQuestionSetForm));