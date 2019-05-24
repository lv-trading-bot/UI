export const getPortfolio = (condition = {}, sort = {}, limit = 100, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/portfolio",
    method: "GET",
    params: {condition, sort, limit, page},
    headers: {}
})