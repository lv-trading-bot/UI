import {requestApi} from '../api/requestApi';
import {getTrigger} from '../api/trigger';

export const triggerAction = {
    BEGIN_LOAD_TRIGGER: "BEGIN_LOAD_TRIGGER",
    LOAD_TRIGGER_DONE: "LOAD_TRIGGER_DONE",
    LOAD_TRIGGER_ERROR: "LOAD_TRIGGER_ERROR",
    CHANGE_PAIR: "CHANGE_PAIR"
}

export const changePair = (id, asset_name, currency_name) => ({
    type: triggerAction.CHANGE_PAIR,
    id,
    asset_name,
    currency_name
})

export const beginLoadTrigger = (id, asset_name, currency_name) => ({
    type: triggerAction.BEGIN_LOAD_TRIGGER,
    id,
    asset_name,
    currency_name
})

export const loadTriggerDone = (triggers, id, asset_name, currency_name) => ({
    type: triggerAction.LOAD_TRIGGER_DONE,
    triggers,
    id,
    asset_name,
    currency_name
})

export const loadTriggerError = (error, id, asset_name, currency_name) => ({
    type: triggerAction.LOAD_TRIGGER_ERROR,
    error,
    id,
    asset_name,
    currency_name
})

export const loadTrigger = (id, asset_name, currency_name, condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadTrigger(id, asset_name, currency_name));
        requestApi(getTrigger(id, asset_name, currency_name, condition, sort, limit, page))
        .then(res => {
            dispatch(loadTriggerDone(res, id, asset_name, currency_name));
        })
        .catch(err => {
            dispatch(loadTriggerError(err, id, asset_name, currency_name));
        })
    }
}