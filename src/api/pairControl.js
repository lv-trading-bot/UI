export const getPairControl = (condition = {}, sort = {}, limit = 100, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/pair-control",
    method: "GET",
    params: {condition, sort, limit, page},
    headers: {}
})

export const putPairControl = (id, asset, currency, accept_buy, set_by = 'User') => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/pair-control",
    method: "PUT",
    params: {id, asset, currency, accept_buy, set_by},
    headers: {}
})