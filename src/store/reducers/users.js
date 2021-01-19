import {
    FETCH_USERS_ADD,
    FETCH_USERS_DELETE,
    FETCH_USERS_GET, FETCH_USERS_OFF
} from "../actions/actionTypes";

const initialState = {
    users: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS_GET:
            return {
                ...state, users: action.payload
            }
        case FETCH_USERS_DELETE:
            const clonedUsers = { ...state.users };
            delete clonedUsers[action.payload];

            return {
                ...state, users: clonedUsers
            }
        case FETCH_USERS_ADD:
            return {
                ...state, users: { ...state.users, [action.payload.name]: action.payload }
            }
        case FETCH_USERS_OFF:
            return {
                ...state, users: { ...state.users, [action.payload.name]: action.payload }
            }
        default:
            return state
    }
}