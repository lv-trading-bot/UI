export const postLogin = (username, password) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/login",
    method: "POST",
    params: {username, password},
    headers: {}
})