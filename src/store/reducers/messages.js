import {
    FETCH_MESSAGES_ADD,
    FETCH_MESSAGES_DEL,
    FETCH_MESSAGES_SET
} from "../actions/actionTypes";

const initialState = {
    messages: []
}

export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MESSAGES_SET:
            return {
                ...state, messages: [ ...action.payload ]
            }
        case FETCH_MESSAGES_ADD:
            return {
                ...state, messages: [ ...state.messages, action.payload ]
            }
        case FETCH_MESSAGES_DEL:
            return {
                ...state, messages: [ ...state.messages.filter((el) => el.user !== action.payload) ]
            }
        default:
            return state
    }
}