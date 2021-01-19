import axios from "axios";
import socket from "../../socket/socket";
import {
    FETCH_MESSAGES_ADD,
    FETCH_MESSAGES_DEL,
    FETCH_MESSAGES_SET
} from "./actionTypes";

export function fetchMessages() {
    return async dispatch => {
        axios.get('/messages')
            .then( res => dispatch(fetchMessagesSet(res.data)) )
    }
}

export function fetchMessagesSend(message) {
    return dispatch => {
        socket.emit('CHAT:SEND', message);

        dispatch(fetchMessagesAdd(message))
    }
}

export function fetchMessagesSet(messages) {
    return {
        type: FETCH_MESSAGES_SET,
        payload: messages
    }
}

export function fetchMessagesAdd(message) {
    return {
        type: FETCH_MESSAGES_ADD,
        payload: message
    }
}

export function fetchMessagesDel(name) {
    return {
        type: FETCH_MESSAGES_DEL,
        payload: name
    }
}