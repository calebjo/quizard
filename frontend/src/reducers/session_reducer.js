import { RECEIVE_CURRENT_USER, 
    RECEIVE_USER_LOGOUT, 
    RECEIVE_USER_SIGN_IN 
} from '../actions/session_actions';
import { REMOVE_USER, UPDATE_CURRENT_USER } from "../actions/user_actions";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function(state = initialState, action) {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                isAuthenticated: true,
                user: action.currentUser
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case REMOVE_USER:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case RECEIVE_USER_SIGN_IN:
            return {
                isAuthenticated: true,
                user: action.user
            }
        case UPDATE_CURRENT_USER:
            const userData = action.user.data;
            const actionValues = {email: userData.email, username: userData.username};
            const updatedUser = Object.assign(nextState.user, actionValues)
            return {
                isAuthenticated: true,
                user: updatedUser
            }
        default:
            return state;
    }
}