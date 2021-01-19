import {
    FETCH_PROFILE_REMOVE_LOADING,
    FETCH_PROFILE_SET,
    FETCH_PROFILE_SET_LOADING
} from "../actions/actionTypes";

const initialState = {
    name: '',
    url: '',
    isAuth: false,
    loading: false
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROFILE_SET:
            return {
                ...state, name: action.payload.name, url: action.payload.url, isAuth: true
            }
        case FETCH_PROFILE_SET_LOADING:
            return {
                ...state, loading: true
            }
        case FETCH_PROFILE_REMOVE_LOADING:
            return {
                ...state, loading: false
            }
        default:
            return state
    }
}