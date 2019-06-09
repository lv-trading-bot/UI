import {defaultLimtOfAPage} from '../constans/paging';

export const getTrade = (id, asset, currency, condition = {}, sort = {"date": -1}, limit = defaultLimtOfAPage, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/trade",
    method: "GET",
    params: {id, asset, currency, condition, sort, limit, page},
    headers: {}
})