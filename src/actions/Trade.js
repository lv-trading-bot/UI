import {requestApi} from '../api/requestApi';
import {getTrade} from '../api/trade';

export const tradeAction = {
    BEGIN_LOAD_TRADE: "BEGIN_LOAD_TRADE",
    LOAD_TRADE_DONE: "LOAD_TRADE_DONE",
    LOAD_TRADE_ERROR: "LOAD_TRADE_ERROR",
    CHANGE_PAIR_TRADE: "CHANGE_PAIR_TRADE",
    EXPIRED_TRADE: "EXPIRED_TRADE"
}

export const expiredTrade = (id, asset_name, currency_name) => ({
    type: tradeAction.EXPIRED_TRADE,
    id,
    asset_name,
    currency_name
})

export const changePair = (id, asset_name, currency_name) => ({
    type: tradeAction.CHANGE_PAIR_TRADE,
    id,
    asset_name,
    currency_name
})

export const beginLoadTrade = (id, asset_name, currency_name) => ({
    type: tradeAction.BEGIN_LOAD_TRADE,
    id,
    asset_name,
    currency_name
})

export const loadTradeDone = (trades, id, asset_name, currency_name) => ({
    type: tradeAction.LOAD_TRADE_DONE,
    trades,
    id,
    asset_name,
    currency_name
})

export const loadTradeError = (error, id, asset_name, currency_name) => ({
    type: tradeAction.LOAD_TRADE_ERROR,
    error,
    id,
    asset_name,
    currency_name
})

export const loadTrade = (id, asset_name, currency_name, condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadTrade(id, asset_name, currency_name));
        requestApi(getTrade(id, asset_name, currency_name, condition, sort, limit, page))
        .then(res => {
            dispatch(loadTradeDone(res, id, asset_name, currency_name));
        })
        .catch(err => {
            dispatch(loadTradeError(err, id, asset_name, currency_name));
        })
    }
}