import {requestApi} from '../api/requestApi';
import {getPairControl, putPairControl as apiPutPairControl} from '../api/pairControl';

export const pairControlAction = {
    BEGIN_LOAD_PAIR_CONTROL: "BEGIN_LOAD_PAIR_CONTROL",
    LOAD_PAIR_CONTROL_DONE: "LOAD_PAIR_CONTROL_DONE",
    LOAD_PAIR_CONTROL_ERROR: "LOAD_PAIR_CONTROL_ERROR",
    CHANGE_PAIR_PAIR_CONTROL: "CHANGE_PAIR_PAIR_CONTROL",
    EXPIRED_PAIR_CONTROL: "EXPIRED_PAIR_CONTROL"
}

export const expiredPairControl = () => ({
    type: pairControlAction.EXPIRED_PAIR_CONTROL
})

export const changePair = (id, asset_name, currency_name) => ({
    type: pairControlAction.CHANGE_PAIR_PAIR_CONTROL,
    id,
    asset_name,
    currency_name
})

const beginLoadPairControl = () => ({
    type: pairControlAction.BEGIN_LOAD_PAIR_CONTROL
})

const loadPairControlDone = (pairControls) => ({
    type: pairControlAction.LOAD_PAIR_CONTROL_DONE,
    pairControls
})

const loadPairControlError = (error) => ({
    type: pairControlAction.LOAD_PAIR_CONTROL_ERROR,
    error
})

export const loadPairControl = (condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadPairControl());
        requestApi(getPairControl(condition, sort, limit, page))
        .then(res => {
            dispatch(loadPairControlDone(res));
        })
        .catch(err => {
            dispatch(loadPairControlError(err));
        })
    }
}

export const putPairControl = (id, asset, currency, accept_buy, set_by) => {
    return (dispatch, getState) => {
        dispatch(beginLoadPairControl());
        requestApi(apiPutPairControl(id, asset, currency, accept_buy, set_by))
        .then(res => {
            dispatch(expiredPairControl());
        })
        .catch(err => {
            dispatch(loadPairControlError(err));
        })
    }
}