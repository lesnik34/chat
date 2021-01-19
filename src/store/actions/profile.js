import {
    FETCH_PROFILE_REMOVE_LOADING,
    FETCH_PROFILE_SET,
    FETCH_PROFILE_SET_LOADING
} from "./actionTypes";
import socket from "../../socket/socket";
import {CHAT_JOIN, CHAT_REGISTER} from "../../socket/socketTypes";
import {getData} from "../../utils/getData";
import {getRegistrationData} from "../../utils/getRegistrationData";

export function fetchProfile() {
    return async dispatch => {
        dispatch(fetchProfileSetLoading());

        let users = {};
        let profileName = localStorage.getItem('name');
        let avatarUrl = localStorage.getItem('url');
        await getData('/users').then((data) => users = data.data);

        const isUserOnline = users[profileName] && users[profileName].isOnline;
        const isUserRegistered = Object.keys(users).includes(profileName);

        if (!profileName || !avatarUrl || isUserOnline) {
            const randNumber = Math.floor(Math.random() * 5000);
            await getData('https://jsonplaceholder.typicode.com/photos', randNumber)
                .then((data) => avatarUrl = data.data.url);
            const registrationData = getRegistrationData(avatarUrl, users);

            socket.emit(CHAT_REGISTER, registrationData);
            profileName = registrationData.name;
            avatarUrl = registrationData.url;

        } else if (!isUserRegistered) {
            socket.emit(CHAT_REGISTER, {name: profileName, url: avatarUrl});
        }

        socket.emit(CHAT_JOIN, profileName);
        dispatch(fetchProfileSet({name: profileName, url: avatarUrl}));
    }
}

export function fetchProfileSet(data) {
    return {
        type: FETCH_PROFILE_SET,
        payload: data
    }
}

export function fetchProfileSetLoading() {
    return {
        type: FETCH_PROFILE_SET_LOADING
    }
}

export function fetchProfileRemoveLoading() {
    return {
        type: FETCH_PROFILE_REMOVE_LOADING
    }
}