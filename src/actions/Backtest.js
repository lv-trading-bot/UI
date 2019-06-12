import {requestApi} from '../api/requestApi';
import {backtest as backtestApi} from '../api/gekko';

export const backtestAction = {
    PUSH_FORM_DATA: "PUSH_FORM_DATA",
    BEGIN_BACKTEST: "BEGIN_BACKTEST",
    BACKTEST_DONE: "BACKTEST_DONE",
    BACKTEST_ERROR: "BACKTEST_ERROR"
}

export const pushFormData = (formData) => ({
    type: backtestAction.PUSH_FORM_DATA,
    formData
})


export const beginLoadBacktest = () => ({
    type: backtestAction.BEGIN_BACKTEST
})

export const loadBacktestDone = (response) => ({
    type: backtestAction.BACKTEST_DONE,
    response
})

export const loadBacktestError = (error) => ({
    type: backtestAction.BACKTEST_ERROR,
    error
})

export const backtest = (config) => {
    return (dispatch, getState) => {
        dispatch(beginLoadBacktest());
        requestApi(backtestApi(config))
        .then(res => {
            if(!res) {
                dispatch(loadBacktestError("error backtest"));
            } else {
                dispatch(loadBacktestDone(res));
            }
        })
        .catch(err => {
            dispatch(loadBacktestError(err));
        })
    }
}