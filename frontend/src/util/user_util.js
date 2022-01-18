import axios from 'axios';

export const fetchUser = userId => (axios.get(`/api/users/${userId}`));

// No backend routes for these yet
// export const updateUser = userData => (axios.patch(`/api/users/${userData.id}`), userData);
// export const deleteUser = userId => (axios.delete(`/api/users/${userId}`));