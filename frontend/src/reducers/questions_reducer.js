
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
            let index = nextState.findIndex(question => question._id == action.question.data._id)
            if(index >= 0) {
                nextState[index] = action.question.data
            } else {
                nextState.push(action.question.data)
            }
            return nextState;
        case REMOVE_QUESTION:
            return nextState;
        default:
            return state;
    }
}

export default questionsReducer;