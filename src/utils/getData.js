import axios from "axios";

export const getData = (url, randData = '') => new Promise(resolve => {
    axios.get(`${url}/${randData}`)
        .then(res => resolve(res));
})