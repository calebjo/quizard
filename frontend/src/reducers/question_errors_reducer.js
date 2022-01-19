import { RECEIVE_QUESTION_ERRORS, CLEAR_QUESTION_ERRORS, RECEIVE_QUESTION } from "../actions/question_actions";

const defaultState = {};

const QuestionErrorsReducer = (state = defaultState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_QUESTION_ERRORS:
            return action.errors;
        case RECEIVE_QUESTION:
            return defaultState;
        case CLEAR_QUESTION_ERRORS:
            return defaultState;
        default:
            return state;
    }
};

export default QuestionErrorsReducer;