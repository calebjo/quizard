import { connect } from 'react-redux';
import { createQuestion, clearQuestionErrors } from '../../actions/question_actions';
import AddQuestionForm from "./add_question_form";

const mSTP = (state, ownProps) => ({
    questionSet: ownProps.questionSet,
    errors: state.errors.question
});

const mDTP = dispatch => ({
    createQuestion: (questionData) => dispatch(createQuestion(questionData)),
    clearQuestionErrors: () => dispatch(clearQuestionErrors())
});

export default connect(mSTP, mDTP)(AddQuestionForm);