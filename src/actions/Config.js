import {requestApi} from '../api/requestApi';
import {getConfig} from '../api/config';

export const configAction = {
    BEGIN_LOAD_CONFIG: "BEGIN_LOAD_CONFIG",
    LOAD_CONFIG_DONE: "LOAD_CONFIG_DONE",
    LOAD_CONFIG_ERROR: "LOAD_CONFIG_ERROR",
    CHANGE_PAIR_CONFIG: "CHANGE_PAIR_CONFIG",
    EXPIRED_CONFIG: "EXPIRED_CONFIG"
}

export const expiredConfig = () => ({
    type: configAction.EXPIRED_CONFIG
})

export const changePair = (id, asset_name, currency_name) => ({
    type: configAction.CHANGE_PAIR_CONFIG,
    id,
    asset_name,
    currency_name
})

export const beginLoadConfig = () => ({
    type: configAction.BEGIN_LOAD_CONFIG
})

export const loadConfigDone = (configs) => ({
    type: configAction.LOAD_CONFIG_DONE,
    configs
})

export const loadConfigError = (error) => ({
    type: configAction.LOAD_CONFIG_ERROR,
    error
})

export const loadConfig = (condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadConfig());
        requestApi(getConfig(condition, sort, limit, page))
        .then(res => {
            dispatch(loadConfigDone(res));
        })
        .catch(err => {
            dispatch(loadConfigError(err));
        })
    }
}