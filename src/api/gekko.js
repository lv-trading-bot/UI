const defaultConfig = {
    "asset_name": "BTC",
    "currency_name": "USDT",
    "candleSize": 60,
    "stopLoss": -10,
    "takeProfit": 2,
    "amountForOneTrade": 100,
    "expirationPeriod": 24,
    "decisionThreshold": 0.5,
    "stopTradeLimit": -100,
    "breakDuration": -1,
    "model_type": "rolling",
    "model_name": "random_forest",
    "lag": 23,
    "features": ["start", "open", "high", "low", "close", "trades", "volume",
        {
            "name": "omlbct",
            "params": {
                "takeProfit": 2,
                "stopLoss": -10,
                "expirationPeriod": 24
            }
        },
        {
            "name": "TREND_BY_DI",
            "params": {
                "period": 14
            }
        }
    ],
    "label": "omlbct",
    "train_daterange": {
        "from": "2019-01-01T00:00:00.000Z",
        "to": "2019-04-01T00:00:00.000Z"
    },
    "rolling_step": 720,
    "mode": "paper",
    "asset": 0,
    "currency": 5000
}

export const runGekko = (config = defaultConfig) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/run-gekko",
    method: "POST",
    params: config,
    headers: {}
})

export const stopGekko = (gekkoContainerName) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/stop-gekko",
    method: "POST",
    params: {
        container_name: gekkoContainerName
    },
    headers: {}
})

export const startGekko = (gekkoContainerName) => ({
    url: process.env.REACT_APP_LIVE_TRADING_MANAGER_HOST + "/start-gekko",
    method: "POST",
    params: {
        container_name: gekkoContainerName
    },
    headers: {}
})