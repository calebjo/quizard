import { connect } from "react-redux";
import QuestionSetIndex from './question_set_index'

import { fetchAllQuestionSets, fetchQuestionSet } from "../../actions/question_set_actions";

const mSTP = (state, ownProps) => ({
    state
});

const mDTP = dispatch => ({
    fetchAllQuestionSets: () => dispatch(fetchAllQuestionSets()),
    fetchQuestionSet: (questionSet) => dispatch(fetchQuestionSet(questionSet))
});

export default connect(mSTP, mDTP)(QuestionSetIndex);