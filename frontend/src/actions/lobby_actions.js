import * as APIUtil from '../util/lobby_api_util';

export const RECEIVE_LOBBY = 'RECEIVE_LOBBY';
export const REMOVE_LOBBY = 'REMOVE_LOBBY';

export const receiveLobby = lobby => ({
    type: RECEIVE_LOBBY,
    lobby,
});

const removeLobby = id => ({
    type: REMOVE_LOBBY,
    id
})

export const fetchLobbyQuestion = id => dispatch => (
    APIUtil.fetchLobbyQuestion(id).then(lobby => (
        dispatch(receiveLobby(lobby))
    ))
);

export const fetchLobby = id => dispatch => (
    APIUtil.fetchLobby(id).then(lobby => (
        dispatch(receiveLobby(lobby))
    ))
);

export const createLobby = lobby => dispatch => (
    APIUtil.createLobby(lobby).then(lobby => (
        dispatch(receiveLobby(lobby))
    ))
);

export const updateLobby = (lobby) => dispatch => (
    APIUtil.updateLobby(lobby).then( lobby => (
        dispatch (receiveLobby(lobby))))
);

export const deleteLobby = (id) => dispatch => (
    APIUtil.deleteLobby(id).then( () => (
        dispatch (removeLobby(id))))
);