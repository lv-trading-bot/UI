import {requestApi} from '../api/requestApi';
import {getAdvice} from '../api/advice';

export const adviceAction = {
    BEGIN_LOAD_ADVICE: "BEGIN_LOAD_ADVICE",
    LOAD_ADVICE_DONE: "LOAD_ADVICE_DONE",
    LOAD_ADVICE_ERROR: "LOAD_ADVICE_ERROR",
    CHANGE_PAIR_ADVICE: "CHANGE_PAIR_ADVICE",
    EXPIRED_ADVICE: "EXPIRED_ADVICE"
}

export const expiredAdvice = (id, asset_name, currency_name) => ({
    type: adviceAction.EXPIRED_ADVICE,
    id,
    asset_name,
    currency_name
})

export const changePair = (id, asset_name, currency_name) => ({
    type: adviceAction.CHANGE_PAIR_ADVICE,
    id,
    asset_name,
    currency_name
})

export const beginLoadAdvice = (id, asset_name, currency_name) => ({
    type: adviceAction.BEGIN_LOAD_ADVICE,
    id,
    asset_name,
    currency_name
})

export const loadAdviceDone = (advices, id, asset_name, currency_name) => ({
    type: adviceAction.LOAD_ADVICE_DONE,
    advices,
    id,
    asset_name,
    currency_name
})

export const loadAdviceError = (error, id, asset_name, currency_name) => ({
    type: adviceAction.LOAD_ADVICE_ERROR,
    error,
    id,
    asset_name,
    currency_name
})

export const loadAdvice = (id, asset_name, currency_name, condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadAdvice(id, asset_name, currency_name));
        requestApi(getAdvice(id, asset_name, currency_name, condition, sort, limit, page))
        .then(res => {
            dispatch(loadAdviceDone(res, id, asset_name, currency_name));
        })
        .catch(err => {
            dispatch(loadAdviceError(err, id, asset_name, currency_name));
        })
    }
}