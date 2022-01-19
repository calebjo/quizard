import axios from 'axios';

export const fetchLobby = id => {
    return axios.get(
        `/api/lobby/${id}`
    );
};

export const createLobby = (id, lobbyData) => {
    return axios.post(
        `/api/lobby/${id}`, 
        lobbyData
    );
};
  
export const updateLobby = (id, lobbyData) => {
    return axios.patch(
        `/api/lobby/${id}`,
        lobbyData
    );
};

export const deleteLobby = id => {
    return axios.delete(
        `/api/lobby/${id}`
    );
};