import axios from 'axios';

export const fetchLobby = id => {
    return axios.get(
        `/api/lobby/${id}`
    );
};

export const createLobby = (lobbyData) => {
    return axios.post(
        `/api/lobby/`, 
        lobbyData
    );
};
  
export const updateLobby = (lobbyData) => {
    return axios.patch(
        `/api/lobby/${lobbyData.id}`,
        lobbyData
    );
};

export const deleteLobby = id => {
    return axios.delete(
        `/api/lobby/${id}`
    );
};