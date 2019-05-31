import {requestApi} from '../api/requestApi';
import {getStatus} from '../api/status';

export const statusAction = {
    BEGIN_LOAD_STATUS: "BEGIN_LOAD_STATUS",
    LOAD_STATUS_DONE: "LOAD_STATUS_DONE",
    LOAD_STATUS_ERROR: "LOAD_STATUS_ERROR",
    EXPIRED_STATUS: "EXPIRED_STATUS"
}

export const expiredStatus = () => ({
    type: statusAction.EXPIRED_STATUS
})

export const beginLoadStatus = () => ({
    type: statusAction.BEGIN_LOAD_STATUS
})

export const loadStatusDone = (statuss) => ({
    type: statusAction.LOAD_STATUS_DONE,
    statuss
})

export const loadStatusError = (error) => ({
    type: statusAction.LOAD_STATUS_ERROR,
    error
})

export const loadStatus = (condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadStatus());
        requestApi(getStatus(condition, sort, limit, page))
        .then(res => {
            dispatch(loadStatusDone(res));
        })
        .catch(err => {
            dispatch(loadStatusError(err));
        })
    }
}