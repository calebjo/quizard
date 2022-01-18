
import { RECEIVE_ALL_QUESTION_SETS, 
    RECEIVE_QUESTION_SET, 
    REMOVE_QUESTION_SET
} from "../actions/question_set_actions";

const questionSetsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_ALL_QUESTION_SETS:
            return action.questionSets.data
        case RECEIVE_QUESTION_SET:
            let index = nextState.findIndex(questionSet => questionSet._id == action.questionSet.data._id)
            if(index >= 0) {
                nextState[index] = action.questionSet.data
            } else {
                nextState.push(action.questionSet.data)
            }
            return nextState;
        case REMOVE_QUESTION_SET:
            return nextState;
        default:
            return state;
    }
}

export default questionSetsReducer;