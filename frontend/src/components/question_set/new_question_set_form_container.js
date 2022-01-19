import { connect } from "react-redux";
import { createQuestionSet, clearQsetErrors } from "../../actions/question_set_actions";
import NewQuestionSetForm from "./new_question_set_form";

const mSTP = state => ({
    currentUser: state.session.user,
    errors: state.errors.questionSet
});

const mDTP = dispatch => ({
    createQuestionSet: qset => dispatch(createQuestionSet(qset)),
    clearQsetErrors: () => dispatch(clearQsetErrors())
});

export default connect(mSTP, mDTP)(NewQuestionSetForm);