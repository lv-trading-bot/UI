import {defaultLimtOfAPage} from '../constans/paging';

export const getAdvice = (id, asset, currency, condition = {}, sort = {"at": -1}, limit = defaultLimtOfAPage, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/advice",
    method: "GET",
    params: {id, asset, currency, condition, sort, limit, page},
    headers: {}
})