import {defaultLimtOfAPage} from '../constans/paging';

export const getTrigger = (id, asset, currency, condition = {}, sort = {"at": -1}, limit = defaultLimtOfAPage * 2, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/trigger",
    method: "GET",
    params: {id, asset, currency, condition, sort, limit, page},
    headers: {}
})