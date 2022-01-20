import {RECEIVE_QUESTION_SET} from "../actions/question_set_actions";

const defaultState = null;

const lastQuestionSetReducer = (state = defaultState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_QUESTION_SET:
            return action.questionSet.data._id;
        default:
            return state;
    }
}

export default lastQuestionSetReducer;