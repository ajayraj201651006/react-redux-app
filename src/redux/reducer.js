import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from './actionTypes';

const initialState = {
    loading: false,
    error: '',
    users: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        
        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload]
            }

        case ADD_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default: return state
    }
}

export default reducer;