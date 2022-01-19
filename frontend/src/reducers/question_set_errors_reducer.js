import { RECEIVE_QSET_ERRORS, CLEAR_QSET_ERRORS, RECEIVE_QUESTION_SET } from "../actions/question_set_actions";

const defaultState = {};

const QuestionSetErrorsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_QSET_ERRORS:
            return action.errors;
        case RECEIVE_QUESTION_SET:
            return defaultState;
        case CLEAR_QSET_ERRORS:
            return defaultState;
        default:
            return state;
    }
};

export default QuestionSetErrorsReducer;