import { connect } from 'react-redux';
import { createQuestion, clearQuestionErrors } from '../../actions/question_actions';
import QuestionForm from "./question_form";

const mSTP = (state, ownProps) => ({
    formType: "new",
    question: {
        set_id: ownProps.match.params.id, 
        category: "", // set this in component did mount
        question: "",
        correctAnswer: "",
        incorrectAnswers: [],
        type: "Multiple Choice"
        },
    errors: state.errors.question
});

const mDTP = dispatch => ({
    submitAction: (questionData) => dispatch(createQuestion(questionData)),
    clearQuestionErrors: () => dispatch(clearQuestionErrors())
});

export default connect(mSTP, mDTP)(QuestionForm);