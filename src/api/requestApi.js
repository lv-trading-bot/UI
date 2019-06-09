import axios from 'axios';
import * as _ from 'lodash';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

export const requestApi = (api = {url: "", method: "", headers: {}, params: {}}) => {
    let config = {
        url: api.url,
        method: api.method,
        headers: api.headers
    }

    config[_.upperCase(config.method) === 'GET' ? "params" : "data"] = api.params;

    return new Promise((resolve, reject) => {
        axios(config)
        .then(res => {
            return resolve(res.data);
        })
        .catch(err => {
            if(err.response && err.response.status === 403) {
                let prevUrl = window.location.hash.replace("#", "");
                if (prevUrl.indexOf('/login') < 0) {
                    window.location.href = `/#/login?prevUrl=${prevUrl}`;
                }
            }
            return reject(err);
        })
    })
}