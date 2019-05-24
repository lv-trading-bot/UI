import axios from 'axios'
import * as _ from 'lodash'

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
            return reject(err);
        })
    })
}