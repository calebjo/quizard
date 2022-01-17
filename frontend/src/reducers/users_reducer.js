
import { RECEIVE_CURRENT_USER, 
    RECEIVE_USER_LOGOUT, 
    RECEIVE_USER_SIGN_IN
    } from "../actions/session_actions";

const _nullSession = {
    id: null
};

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_USER_SIGN_IN:
            nextState[action.user.data._id] = action.user.data
            return nextState;
        case RECEIVE_CURRENT_USER:
            nextState[action.currentUser.id] = action.currentUser
            return nextState;
        case RECEIVE_USER_LOGOUT:
            return _nullSession;
        default:
            return state;
    }
}

export default usersReducer;