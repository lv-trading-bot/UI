import {requestApi} from '../api/requestApi';
import {runGekko as runGekkoApi, stopGekko as stopGekkoApi, startGekko as startGekkoApi} from '../api/gekko';
import {expiredStatus} from './Status'; 

export const gekkoAction = {
    BEGIN_GEKKO: "BEGIN_GEKKO",
    GEKKO_DONE: "GEKKO_DONE",
    GEKKO_ERROR: "GEKKO_ERROR"
}

export const beginGekko = () => ({
    type: gekkoAction.BEGIN_GEKKO
})

export const gekkoDone = () => ({
    type: gekkoAction.GEKKO_DONE
})

export const gekkoError = (error) => ({
    type: gekkoAction.GEKKO_ERROR,
    error
})

export const runGekko = (config) => {
    return (dispatch, getState) => {
        dispatch(beginGekko());
        requestApi(runGekkoApi(config))
        .then(res => {
            if(res.error) {
                dispatch(gekkoError(res.error));
            } else {
                setTimeout(() => {
                    dispatch(gekkoDone());
                    dispatch(expiredStatus());
                }, 5000)
            }
        })
        .catch(err => {
            dispatch(gekkoError(err));
        })
    }
}

export const startGekko = (containerName) => {
    return (dispatch, getState) => {
        dispatch(beginGekko());
        requestApi(startGekkoApi(containerName))
        .then(res => {
            if(res.error) {
                dispatch(gekkoError(res.error));
            } else {
                setTimeout(() => {
                    dispatch(gekkoDone());
                    dispatch(expiredStatus());
                }, 5000)
            }
        })
        .catch(err => {
            dispatch(gekkoError(err));
        })
    }
}

export const stopGekko = (containerName) => {
    return (dispatch, getState) => {
        dispatch(beginGekko());
        requestApi(stopGekkoApi(containerName))
        .then(res => {
            if(res.error) {
                dispatch(gekkoError(res.error));
            } else {
                setTimeout(() => {
                    dispatch(gekkoDone());
                    dispatch(expiredStatus());
                }, 5000)
            }
        })
        .catch(err => {
            dispatch(gekkoError(err));
        })
    }
}