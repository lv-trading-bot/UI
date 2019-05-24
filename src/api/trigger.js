export const getTrigger = (id, asset, currency, condition = {}, sort = {}, limit = 100, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/trigger",
    method: "GET",
    params: {id, asset, currency, condition, sort, limit, page},
    headers: {}
})