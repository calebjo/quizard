
import { RECEIVE_ALL_QUESTIONS, 
    RECEIVE_QUESTION, 
    REMOVE_QUESTION
} from "../actions/question_actions";

const questionsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_ALL_QUESTIONS:
            return action.questions.data
        case RECEIVE_QUESTION:
            const qSet = {[action.question.data._id]: action.question.data};
            return Object.assign(nextState, qSet);
        case REMOVE_QUESTION:
            for (const key in nextState) {
                if (nextState[key]._id === action.id) delete nextState[key];
            }
            return nextState;
        default:
            return state;
    }
}

export default questionsReducer;