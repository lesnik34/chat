import {FETCH_USERS_ADD, FETCH_USERS_DELETE, FETCH_USERS_GET, FETCH_USERS_OFF} from "./actionTypes";
import axios from "axios";

export function fetchUsers() {
    return async dispatch => {
        await axios.get('/users')
            .then(res => {
                return dispatch(fetchUsersGet(res.data))
            })
    }
}

export function fetchUsersGet(users) {
    return {
        type: FETCH_USERS_GET,
        payload: users
    }
}

export function fetchUsersAdd(cameUser) {
    return {
        type: FETCH_USERS_ADD,
        payload: cameUser
    }
}

export function fetchUsersOff(goneUser) {
    return {
        type: FETCH_USERS_OFF,
        payload: goneUser
    }
}

export function fetchUsersDelete(data) {
    return {
        type: FETCH_USERS_DELETE,
        payload: data
    }
}