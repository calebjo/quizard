
import { RECEIVE_LOBBY, REMOVE_LOBBY}  from "../actions/lobby_actions";

const lobbiesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_LOBBY:
            const lobby = {[action.lobby.data.room_id]: action.lobby.data};
            return Object.assign(nextState, lobby);
        case REMOVE_LOBBY:
            delete nextState[action.lobby];
            return nextState;
        default:
            return state;
    }
}
    
export default lobbiesReducer;