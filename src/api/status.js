export const getStatus = (condition = {}, sort = {"status": 1}, limit = 1000, page = 1) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/status",
    method: "GET",
    params: {condition, sort, limit, page},
    headers: {}
})