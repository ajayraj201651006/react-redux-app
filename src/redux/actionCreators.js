import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from './actionTypes';

export const addUserRequest = () => {
    return {
        type: ADD_USER_REQUEST
    }
}

export const addUserSuccess = (user) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: user
    }
}

export const addUserFailure = (error) => {
    return {
        type: ADD_USER_FAILURE,
        payload: error
    }
}

