import * as UserUtil from "../util/user_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const CLEAR_USER_ERRORS = "CLEAR_USER_ERRORS";

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

const updateCurrentUser = user => ({
    type: UPDATE_CURRENT_USER,
    user
});

const removeUser = userId => ({
    type: REMOVE_USER,
    userId
});

export const receiveUserErrors = errors => ({
    type: RECEIVE_USER_ERRORS,
    errors
});

export const clearUserErrors = () => ({
    type: CLEAR_USER_ERRORS
})

export const fetchUser = userId => dispatch => (
    UserUtil.fetchUser(userId).then((user) => dispatch(receiveUser(user)))
);

export const updateUser = user => dispatch => (
    UserUtil.updateUser(user).then(
        (user) => dispatch(updateCurrentUser(user)),
        (errors) => dispatch(receiveUserErrors(errors.response.data)))
);

export const deleteUser = userId => dispatch => (
    UserUtil.deleteUser(userId).then(() => dispatch(removeUser(userId)))
);