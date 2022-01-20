
import { RECEIVE_ALL_QUESTIONS, 
    RECEIVE_QUESTION, 
    REMOVE_QUESTION
} from "../actions/question_actions";

const questionsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_ALL_QUESTIONS:
            // When questions are received en masse from the DB, the keys do not align with the question IDs
            // The following data manipulation attempts to fix that
            const improvedState = {};
            for (const key in action.questions.data) {
                let questionId = action.questions.data[key]._id;
                Object.assign(improvedState, {[questionId]: action.questions.data[key]})
            }
            return improvedState;
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