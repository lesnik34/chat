import {nameGeneration} from "./nameGeneration";

export const getRegistrationData = (avatarUrl, users) => {
    let newName = nameGeneration();
    let newUrl = avatarUrl;

    while (Object.keys(users).includes(newName)) {
        newName = nameGeneration();
    }

    localStorage.setItem('name', newName);
    localStorage.setItem('url', newUrl);

    return {name: newName, url: newUrl}
}