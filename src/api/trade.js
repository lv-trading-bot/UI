export const getTrade = (id, asset, currency, condition = {}, sort = {}, limit = {}, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/trade",
    method: "GET",
    params: {id, asset, currency, condition, sort, limit, page},
    headers: {}
})