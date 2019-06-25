import { backtestAction } from "../actions/Backtest";

// const initialState = {
//     isLoading: false,
//     isError: false,
//     errorMessage: null,
//     response: null
// }

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: null,
    response: {
        market: {
            exchange: 'binance',
            currency: 'USDT',
            asset: 'BTC'
        },
        tradingAdvisor: {
            enabled: true,
            method: 'OMLBCTWithStopTrade',
            candleSize: 60,
            historySize: 0
        },
        strategyParameters: {
            stopLoss: -10,
            takeProfit: 2,
            amountForOneTrade: 100,
            expirationPeriod: 24,
            decisionThreshold: 0.5,
            backtest: true,
            dataFile: 'data-for-backtest/1561431192378_8462605.json',
            stopTradeLimit: -500000,
            breakDuration: -1,
            features: [
                'start',
                'open',
                'high',
                'low',
                'close',
                'trades',
                'volume',
                {
                    name: 'omlbct',
                    params: {
                        takeProfit: 2,
                        stopLoss: -10,
                        expirationPeriod: 24
                    }
                },
                {
                    name: 'TREND_BY_DI',
                    params: {
                        period: 14
                    }
                }
            ],
            label: 'omlbct',
            note: 'Ghi chú tại đây'
        },
        performanceReport: {
            momentEndTime: '2019-01-10T00:00:00.000Z',
            startTime: '2019-01-01 00:00:00',
            endTime: '2019-01-10 00:00:00',
            timespan: '9 days',
            market: 7.135526109667623,
            balance: 7184.2150504699985,
            profit: 184.21505046999846,
            relativeProfit: 2.6316435781428282,
            yearlyProfit: 7475.907285698712,
            relativeYearlyProfit: 106.79867550998132,
            startPrice: 3702.46,
            endPrice: 3966.65,
            trades: 190,
            startBalance: 7000,
            lowestBalance: 4700,
            exposure: 0.6699074074074074,
            sharpe: 687.9523856934877,
            downside: null,
            alpha: 177.07952436033082
        },
        roundtrips: [
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T19:00:00.000Z',
                    initialPrice: 3659.41,
                    trend: 2.1686556029523922,
                    expires: '2019-01-02T19:00:00.000Z',
                    assetAmount: 0.02729948,
                    exitAt: '2019-01-01T23:19:00.000Z',
                    exitPrice: 3738.77,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fdd',
                        start: '2019-01-01T23:19:00.000Z',
                        open: 3727.92,
                        high: 3744.95,
                        low: 3724.82,
                        close: 3738.77,
                        volume: 61.223784,
                        end_time: 1546384739999,
                        quote_asset_volume: 228575.69281222,
                        trades: 400,
                        taker_buy_base_asset_volume: 54.989772,
                        taker_buy_quote_asset_volume: 205316.61460501,
                        ignore: 0
                    }
                },
                id: 'trigger-19'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T01:00:00.000Z',
                    initialPrice: 3700.31,
                    trend: 2.2430553115820024,
                    expires: '2019-01-02T01:00:00.000Z',
                    assetAmount: 0.02699773,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-1'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T02:00:00.000Z',
                    initialPrice: 3689.69,
                    trend: 2.5373405353837284,
                    expires: '2019-01-02T02:00:00.000Z',
                    assetAmount: 0.02707544,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-2'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T03:00:00.000Z',
                    initialPrice: 3690,
                    trend: 2.528726287262871,
                    expires: '2019-01-02T03:00:00.000Z',
                    assetAmount: 0.02707317,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-3'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T04:00:00.000Z',
                    initialPrice: 3693.13,
                    trend: 2.4418311838467597,
                    expires: '2019-01-02T04:00:00.000Z',
                    assetAmount: 0.02705022,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-4'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T05:00:00.000Z',
                    initialPrice: 3692.71,
                    trend: 2.453482672617127,
                    expires: '2019-01-02T05:00:00.000Z',
                    assetAmount: 0.0270533,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-5'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T06:00:00.000Z',
                    initialPrice: 3699.94,
                    trend: 2.2532797829153957,
                    expires: '2019-01-02T06:00:00.000Z',
                    assetAmount: 0.02700043,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-6'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T07:00:00.000Z',
                    initialPrice: 3703.56,
                    trend: 2.1533335493417143,
                    expires: '2019-01-02T07:00:00.000Z',
                    assetAmount: 0.02697404,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-7'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T08:00:00.000Z',
                    initialPrice: 3713.83,
                    trend: 1.8708449228963098,
                    expires: '2019-01-02T08:00:00.000Z',
                    assetAmount: 0.02689945,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-8'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T10:00:00.000Z',
                    initialPrice: 3699.95,
                    trend: 2.253003418965125,
                    expires: '2019-01-02T10:00:00.000Z',
                    assetAmount: 0.02700036,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-10'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T11:00:00.000Z',
                    initialPrice: 3713.07,
                    trend: 1.8916960897586035,
                    expires: '2019-01-02T11:00:00.000Z',
                    assetAmount: 0.02690496,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-11'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T12:00:00.000Z',
                    initialPrice: 3707.54,
                    trend: 2.0436731633374148,
                    expires: '2019-01-02T12:00:00.000Z',
                    assetAmount: 0.02694509,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-12'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T15:00:00.000Z',
                    initialPrice: 3698.53,
                    trend: 2.2922620608728264,
                    expires: '2019-01-02T15:00:00.000Z',
                    assetAmount: 0.02701073,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-15'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T16:00:00.000Z',
                    initialPrice: 3682.61,
                    trend: 2.7344736477661176,
                    expires: '2019-01-02T16:00:00.000Z',
                    assetAmount: 0.02712749,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-16'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T17:00:00.000Z',
                    initialPrice: 3693.54,
                    trend: 2.4304596674193317,
                    expires: '2019-01-02T17:00:00.000Z',
                    assetAmount: 0.02704722,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-17'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T18:00:00.000Z',
                    initialPrice: 3686.32,
                    trend: 2.631079233490304,
                    expires: '2019-01-02T18:00:00.000Z',
                    assetAmount: 0.02710019,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-18'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T20:00:00.000Z',
                    initialPrice: 3696.73,
                    trend: 2.3420698833834206,
                    expires: '2019-01-02T20:00:00.000Z',
                    assetAmount: 0.02702388,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-20'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T22:00:00.000Z',
                    initialPrice: 3708.21,
                    trend: 2.02523589548596,
                    expires: '2019-01-02T22:00:00.000Z',
                    assetAmount: 0.02694022,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-22'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T23:00:00.000Z',
                    initialPrice: 3711.2,
                    trend: 1.943037292519943,
                    expires: '2019-01-02T23:00:00.000Z',
                    assetAmount: 0.02691851,
                    exitAt: '2019-01-01T23:20:00.000Z',
                    exitPrice: 3783.31,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fde',
                        start: '2019-01-01T23:37:00.000Z',
                        open: 3738.77,
                        high: 3789,
                        low: 3738.77,
                        close: 3783.31,
                        volume: 712.949014,
                        end_time: 1546384799999,
                        quote_asset_volume: 2686034.79001284,
                        trades: 2493,
                        taker_buy_base_asset_volume: 407.822182,
                        taker_buy_quote_asset_volume: 1536964.57389927,
                        ignore: 0
                    }
                },
                id: 'trigger-23'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T09:00:00.000Z',
                    initialPrice: 3716.7,
                    trend: 1.9821346893749852,
                    expires: '2019-01-02T09:00:00.000Z',
                    assetAmount: 0.02687868,
                    exitAt: '2019-01-01T23:21:00.000Z',
                    exitPrice: 3790.37,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fdf',
                        start: '2019-01-01T23:23:00.000Z',
                        open: 3775.11,
                        high: 3793.29,
                        low: 3775.11,
                        close: 3790.37,
                        volume: 213.925088,
                        end_time: 1546384859999,
                        quote_asset_volume: 810374.03243468,
                        trades: 1122,
                        taker_buy_base_asset_volume: 118.717227,
                        taker_buy_quote_asset_volume: 449845.56286616,
                        ignore: 0
                    }
                },
                id: 'trigger-9'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T13:00:00.000Z',
                    initialPrice: 3717,
                    trend: 1.9739036857680896,
                    expires: '2019-01-02T13:00:00.000Z',
                    assetAmount: 0.02687651,
                    exitAt: '2019-01-01T23:21:00.000Z',
                    exitPrice: 3790.37,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fdf',
                        start: '2019-01-01T23:23:00.000Z',
                        open: 3775.11,
                        high: 3793.29,
                        low: 3775.11,
                        close: 3790.37,
                        volume: 213.925088,
                        end_time: 1546384859999,
                        quote_asset_volume: 810374.03243468,
                        trades: 1122,
                        taker_buy_base_asset_volume: 118.717227,
                        taker_buy_quote_asset_volume: 449845.56286616,
                        ignore: 0
                    }
                },
                id: 'trigger-13'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T14:00:00.000Z',
                    initialPrice: 3715.93,
                    trend: 2.00326701525594,
                    expires: '2019-01-02T14:00:00.000Z',
                    assetAmount: 0.02688425,
                    exitAt: '2019-01-01T23:21:00.000Z',
                    exitPrice: 3790.37,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fdf',
                        start: '2019-01-01T23:23:00.000Z',
                        open: 3775.11,
                        high: 3793.29,
                        low: 3775.11,
                        close: 3790.37,
                        volume: 213.925088,
                        end_time: 1546384859999,
                        quote_asset_volume: 810374.03243468,
                        trades: 1122,
                        taker_buy_base_asset_volume: 118.717227,
                        taker_buy_quote_asset_volume: 449845.56286616,
                        ignore: 0
                    }
                },
                id: 'trigger-14'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-01T21:00:00.000Z',
                    initialPrice: 3719,
                    trend: 1.925517612261364,
                    expires: '2019-01-02T21:00:00.000Z',
                    assetAmount: 0.02686205,
                    exitAt: '2019-01-01T23:22:00.000Z',
                    exitPrice: 3790.61,
                    exitCandle: {
                        _id: '5d0364fdd023ee0011f80fe0',
                        start: '2019-01-01T23:22:00.000Z',
                        open: 3789.33,
                        high: 3798.39,
                        low: 3780,
                        close: 3790.61,
                        volume: 203.475211,
                        end_time: 1546384919999,
                        quote_asset_volume: 770899.70177428,
                        trades: 711,
                        taker_buy_base_asset_volume: 126.285401,
                        taker_buy_quote_asset_volume: 478662.98136036,
                        ignore: 0
                    }
                },
                id: 'trigger-21'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T07:00:00.000Z',
                    initialPrice: 3758.53,
                    trend: 2.1577584853652865,
                    expires: '2019-01-03T07:00:00.000Z',
                    assetAmount: 0.02657954,
                    exitAt: '2019-01-02T13:33:00.000Z',
                    exitPrice: 3839.63,
                    exitCandle: {
                        _id: '5d0364ffd023ee0011f835a7',
                        start: '2019-01-02T13:33:00.000Z',
                        open: 3807.17,
                        high: 3839.63,
                        low: 3807.17,
                        close: 3839.63,
                        volume: 276.495967,
                        end_time: 1546435979999,
                        quote_asset_volume: 1058857.90166716,
                        trades: 1176,
                        taker_buy_base_asset_volume: 186.713618,
                        taker_buy_quote_asset_volume: 714968.49959621,
                        ignore: 0
                    }
                },
                id: 'trigger-31'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T01:00:00.000Z',
                    initialPrice: 3778.02,
                    trend: 2.1585380702060917,
                    expires: '2019-01-03T01:00:00.000Z',
                    assetAmount: 0.02644242,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-25'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T02:00:00.000Z',
                    initialPrice: 3770,
                    trend: 2.3758620689655214,
                    expires: '2019-01-03T02:00:00.000Z',
                    assetAmount: 0.02649867,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-26'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T03:00:00.000Z',
                    initialPrice: 3783.28,
                    trend: 2.0165041974159976,
                    expires: '2019-01-03T03:00:00.000Z',
                    assetAmount: 0.02640565,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-27'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T04:00:00.000Z',
                    initialPrice: 3779.98,
                    trend: 2.105566696120089,
                    expires: '2019-01-03T04:00:00.000Z',
                    assetAmount: 0.02642871,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-28'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T05:00:00.000Z',
                    initialPrice: 3776.41,
                    trend: 2.2020914042702016,
                    expires: '2019-01-03T05:00:00.000Z',
                    assetAmount: 0.02645369,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-29'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T06:00:00.000Z',
                    initialPrice: 3773.04,
                    trend: 2.293376163518017,
                    expires: '2019-01-03T06:00:00.000Z',
                    assetAmount: 0.02647732,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-30'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T08:00:00.000Z',
                    initialPrice: 3771.08,
                    trend: 2.34654263500112,
                    expires: '2019-01-03T08:00:00.000Z',
                    assetAmount: 0.02649108,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-32'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T09:00:00.000Z',
                    initialPrice: 3781.35,
                    trend: 2.0685733931003547,
                    expires: '2019-01-03T09:00:00.000Z',
                    assetAmount: 0.02641913,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-33'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T10:00:00.000Z',
                    initialPrice: 3775,
                    trend: 2.240264900662256,
                    expires: '2019-01-03T10:00:00.000Z',
                    assetAmount: 0.02646357,
                    exitAt: '2019-01-02T16:46:00.000Z',
                    exitPrice: 3859.57,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6a',
                        start: '2019-01-02T16:54:00.000Z',
                        open: 3829.98,
                        high: 3859.59,
                        low: 3829.58,
                        close: 3859.57,
                        volume: 441.25386,
                        end_time: 1546447559999,
                        quote_asset_volume: 1697604.26334188,
                        trades: 1358,
                        taker_buy_base_asset_volume: 304.636923,
                        taker_buy_quote_asset_volume: 1172066.64265579,
                        ignore: 0
                    }
                },
                id: 'trigger-34'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T11:00:00.000Z',
                    initialPrice: 3788,
                    trend: 1.5744456177402288,
                    expires: '2019-01-03T11:00:00.000Z',
                    assetAmount: 0.02637275,
                    exitAt: '2019-01-02T16:47:00.000Z',
                    exitPrice: 3847.64,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6b',
                        start: '2019-01-02T16:48:00.000Z',
                        open: 3859.73,
                        high: 3865.72,
                        low: 3842.63,
                        close: 3847.64,
                        volume: 283.296229,
                        end_time: 1546447619999,
                        quote_asset_volume: 1092419.74490775,
                        trades: 1112,
                        taker_buy_base_asset_volume: 166.304782,
                        taker_buy_quote_asset_volume: 641551.53928281,
                        ignore: 0
                    }
                },
                id: 'trigger-35'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T12:00:00.000Z',
                    initialPrice: 3787.97,
                    trend: 1.575250067978365,
                    expires: '2019-01-03T12:00:00.000Z',
                    assetAmount: 0.02637296,
                    exitAt: '2019-01-02T16:47:00.000Z',
                    exitPrice: 3847.64,
                    exitCandle: {
                        _id: '5d036500d023ee0011f83f6b',
                        start: '2019-01-02T16:48:00.000Z',
                        open: 3859.73,
                        high: 3865.72,
                        low: 3842.63,
                        close: 3847.64,
                        volume: 283.296229,
                        end_time: 1546447619999,
                        quote_asset_volume: 1092419.74490775,
                        trades: 1112,
                        taker_buy_base_asset_volume: 166.304782,
                        taker_buy_quote_asset_volume: 641551.53928281,
                        ignore: 0
                    }
                },
                id: 'trigger-36'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T00:00:00.000Z',
                    initialPrice: 3797.14,
                    trend: 1.7386770042716355,
                    expires: '2019-01-03T00:00:00.000Z',
                    assetAmount: 0.02630927,
                    exitAt: '2019-01-02T21:52:00.000Z',
                    exitPrice: 3863.16,
                    exitCandle: {
                        _id: '5d03651fd023ee0011f84c90',
                        start: '2019-01-02T21:53:00.000Z',
                        open: 3865.17,
                        high: 3876,
                        low: 3861.96,
                        close: 3863.16,
                        volume: 129.815447,
                        end_time: 1546465919999,
                        quote_asset_volume: 502371.5309883,
                        trades: 698,
                        taker_buy_base_asset_volume: 80.689707,
                        taker_buy_quote_asset_volume: 312266.23244004,
                        ignore: 0
                    }
                },
                id: 'trigger-24'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T13:00:00.000Z',
                    initialPrice: 3792.51,
                    trend: 1.8628823655046296,
                    expires: '2019-01-03T13:00:00.000Z',
                    assetAmount: 0.02634139,
                    exitAt: '2019-01-02T21:52:00.000Z',
                    exitPrice: 3863.16,
                    exitCandle: {
                        _id: '5d03651fd023ee0011f84c90',
                        start: '2019-01-02T21:53:00.000Z',
                        open: 3865.17,
                        high: 3876,
                        low: 3861.96,
                        close: 3863.16,
                        volume: 129.815447,
                        end_time: 1546465919999,
                        quote_asset_volume: 502371.5309883,
                        trades: 698,
                        taker_buy_base_asset_volume: 80.689707,
                        taker_buy_quote_asset_volume: 312266.23244004,
                        ignore: 0
                    }
                },
                id: 'trigger-37'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-02T16:00:00.000Z',
                    initialPrice: 3801.28,
                    trend: 1.8648981395740347,
                    expires: '2019-01-03T16:00:00.000Z',
                    assetAmount: 0.02628062,
                    exitAt: '2019-01-02T23:03:00.000Z',
                    exitPrice: 3872.17,
                    exitCandle: {
                        _id: '5d03651fd023ee0011f851c3',
                        start: '2019-01-02T23:03:00.000Z',
                        open: 3868.04,
                        high: 3879,
                        low: 3867.66,
                        close: 3872.17,
                        volume: 57.189833,
                        end_time: 1546470179999,
                        quote_asset_volume: 221550.26931804,
                        trades: 430,
                        taker_buy_base_asset_volume: 22.35757,
                        taker_buy_quote_asset_volume: 86628.9314713,
                        ignore: 0
                    }
                },
                id: 'trigger-38'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T15:00:00.000Z',
                    initialPrice: 3717.14,
                    trend: 2.196312218533613,
                    expires: '2019-01-05T15:00:00.000Z',
                    assetAmount: 0.0268755,
                    exitAt: '2019-01-04T21:34:00.000Z',
                    exitPrice: 3798.78,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2ca',
                        start: '2019-01-04T21:35:00.000Z',
                        open: 3789.11,
                        high: 3800.1,
                        low: 3789.11,
                        close: 3798.78,
                        volume: 207.31793,
                        end_time: 1546637639999,
                        quote_asset_volume: 787029.05456851,
                        trades: 837,
                        taker_buy_base_asset_volume: 123.633108,
                        taker_buy_quote_asset_volume: 469339.76997734,
                        ignore: 0
                    }
                },
                id: 'trigger-45'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T16:00:00.000Z',
                    initialPrice: 3725.28,
                    trend: 1.9730060559206286,
                    expires: '2019-01-05T16:00:00.000Z',
                    assetAmount: 0.02681677,
                    exitAt: '2019-01-04T21:34:00.000Z',
                    exitPrice: 3798.78,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2ca',
                        start: '2019-01-04T21:35:00.000Z',
                        open: 3789.11,
                        high: 3800.1,
                        low: 3789.11,
                        close: 3798.78,
                        volume: 207.31793,
                        end_time: 1546637639999,
                        quote_asset_volume: 787029.05456851,
                        trades: 837,
                        taker_buy_base_asset_volume: 123.633108,
                        taker_buy_quote_asset_volume: 469339.76997734,
                        ignore: 0
                    }
                },
                id: 'trigger-46'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T19:00:00.000Z',
                    initialPrice: 3730,
                    trend: 1.9571045576407506,
                    expires: '2019-01-05T19:00:00.000Z',
                    assetAmount: 0.02678284,
                    exitAt: '2019-01-04T21:40:00.000Z',
                    exitPrice: 3803,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2d0',
                        start: '2019-01-04T21:40:00.000Z',
                        open: 3800.17,
                        high: 3805.11,
                        low: 3796.08,
                        close: 3803,
                        volume: 99.625409,
                        end_time: 1546637999999,
                        quote_asset_volume: 378741.86155041,
                        trades: 372,
                        taker_buy_base_asset_volume: 48.29605,
                        taker_buy_quote_asset_volume: 183652.63772353,
                        ignore: 0
                    }
                },
                id: 'trigger-49'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T20:00:00.000Z',
                    initialPrice: 3739.53,
                    trend: 1.8847288295587952,
                    expires: '2019-01-05T20:00:00.000Z',
                    assetAmount: 0.02671458,
                    exitAt: '2019-01-04T21:43:00.000Z',
                    exitPrice: 3810.01,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2d3',
                        start: '2019-01-04T21:43:00.000Z',
                        open: 3801.88,
                        high: 3818.34,
                        low: 3801.53,
                        close: 3810.01,
                        volume: 97.394969,
                        end_time: 1546638179999,
                        quote_asset_volume: 371218.42744722,
                        trades: 599,
                        taker_buy_base_asset_volume: 70.509289,
                        taker_buy_quote_asset_volume: 268759.19601646,
                        ignore: 0
                    }
                },
                id: 'trigger-50'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T14:00:00.000Z',
                    initialPrice: 3744,
                    trend: 2.0293803418803424,
                    expires: '2019-01-05T14:00:00.000Z',
                    assetAmount: 0.02668269,
                    exitAt: '2019-01-04T21:46:00.000Z',
                    exitPrice: 3819.98,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2d6',
                        start: '2019-01-04T21:48:00.000Z',
                        open: 3811.35,
                        high: 3823.64,
                        low: 3811.35,
                        close: 3819.98,
                        volume: 92.695113,
                        end_time: 1546638359999,
                        quote_asset_volume: 354013.94238151,
                        trades: 578,
                        taker_buy_base_asset_volume: 49.023644,
                        taker_buy_quote_asset_volume: 187250.90082719,
                        ignore: 0
                    }
                },
                id: 'trigger-44'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T17:00:00.000Z',
                    initialPrice: 3747.5,
                    trend: 1.9340893929286196,
                    expires: '2019-01-05T17:00:00.000Z',
                    assetAmount: 0.02665777,
                    exitAt: '2019-01-04T21:46:00.000Z',
                    exitPrice: 3819.98,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2d6',
                        start: '2019-01-04T21:48:00.000Z',
                        open: 3811.35,
                        high: 3823.64,
                        low: 3811.35,
                        close: 3819.98,
                        volume: 92.695113,
                        end_time: 1546638359999,
                        quote_asset_volume: 354013.94238151,
                        trades: 578,
                        taker_buy_base_asset_volume: 49.023644,
                        taker_buy_quote_asset_volume: 187250.90082719,
                        ignore: 0
                    }
                },
                id: 'trigger-47'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T18:00:00.000Z',
                    initialPrice: 3745.22,
                    trend: 1.9961444187524424,
                    expires: '2019-01-05T18:00:00.000Z',
                    assetAmount: 0.026674,
                    exitAt: '2019-01-04T21:46:00.000Z',
                    exitPrice: 3819.98,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8d2d6',
                        start: '2019-01-04T21:48:00.000Z',
                        open: 3811.35,
                        high: 3823.64,
                        low: 3811.35,
                        close: 3819.98,
                        volume: 92.695113,
                        end_time: 1546638359999,
                        quote_asset_volume: 354013.94238151,
                        trades: 578,
                        taker_buy_base_asset_volume: 49.023644,
                        taker_buy_quote_asset_volume: 187250.90082719,
                        ignore: 0
                    }
                },
                id: 'trigger-48'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T01:00:00.000Z',
                    initialPrice: 3750.3,
                    trend: 2.0912993627176446,
                    expires: '2019-01-05T01:00:00.000Z',
                    assetAmount: 0.02663786,
                    exitAt: '2019-01-05T00:16:00.000Z',
                    exitPrice: 3828.73,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8daec',
                        start: '2019-01-05T00:16:00.000Z',
                        open: 3813.75,
                        high: 3828.73,
                        low: 3813.74,
                        close: 3828.73,
                        volume: 117.696817,
                        end_time: 1546647359999,
                        quote_asset_volume: 449831.80496503,
                        trades: 618,
                        taker_buy_base_asset_volume: 93.986718,
                        taker_buy_quote_asset_volume: 359256.96674821,
                        ignore: 0
                    }
                },
                id: 'trigger-39'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T03:00:00.000Z',
                    initialPrice: 3758.65,
                    trend: 2.0302502228193617,
                    expires: '2019-01-05T03:00:00.000Z',
                    assetAmount: 0.02657869,
                    exitAt: '2019-01-05T00:17:00.000Z',
                    exitPrice: 3834.96,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8daed',
                        start: '2019-01-05T00:19:00.000Z',
                        open: 3828,
                        high: 3836.99,
                        low: 3825.23,
                        close: 3834.96,
                        volume: 259.693723,
                        end_time: 1546647419999,
                        quote_asset_volume: 995353.51757673,
                        trades: 977,
                        taker_buy_base_asset_volume: 150.646273,
                        taker_buy_quote_asset_volume: 577461.00881915,
                        ignore: 0
                    }
                },
                id: 'trigger-40'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T12:00:00.000Z',
                    initialPrice: 3757.55,
                    trend: 2.0601189604928702,
                    expires: '2019-01-05T12:00:00.000Z',
                    assetAmount: 0.02658647,
                    exitAt: '2019-01-05T00:17:00.000Z',
                    exitPrice: 3834.96,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8daed',
                        start: '2019-01-05T00:19:00.000Z',
                        open: 3828,
                        high: 3836.99,
                        low: 3825.23,
                        close: 3834.96,
                        volume: 259.693723,
                        end_time: 1546647419999,
                        quote_asset_volume: 995353.51757673,
                        trades: 977,
                        taker_buy_base_asset_volume: 150.646273,
                        taker_buy_quote_asset_volume: 577461.00881915,
                        ignore: 0
                    }
                },
                id: 'trigger-42'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T13:00:00.000Z',
                    initialPrice: 3755.52,
                    trend: 2.115286298568509,
                    expires: '2019-01-05T13:00:00.000Z',
                    assetAmount: 0.02660084,
                    exitAt: '2019-01-05T00:17:00.000Z',
                    exitPrice: 3834.96,
                    exitCandle: {
                        _id: '5d036527d023ee0011f8daed',
                        start: '2019-01-05T00:19:00.000Z',
                        open: 3828,
                        high: 3836.99,
                        low: 3825.23,
                        close: 3834.96,
                        volume: 259.693723,
                        end_time: 1546647419999,
                        quote_asset_volume: 995353.51757673,
                        trades: 977,
                        taker_buy_base_asset_volume: 150.646273,
                        taker_buy_quote_asset_volume: 577461.00881915,
                        ignore: 0
                    }
                },
                id: 'trigger-43'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T10:00:00.000Z',
                    initialPrice: 3764.35,
                    trend: 1.9089617065363245,
                    expires: '2019-01-05T10:00:00.000Z',
                    assetAmount: 0.02653844,
                    exitAt: '2019-01-05T05:53:00.000Z',
                    exitPrice: 3836.21,
                    exitCandle: {
                        _id: '5d036528d023ee0011f8ea11',
                        start: '2019-01-05T05:54:00.000Z',
                        open: 3834.73,
                        high: 3840.99,
                        low: 3834.73,
                        close: 3836.21,
                        volume: 90.906122,
                        end_time: 1546667579999,
                        quote_asset_volume: 348870.73571141,
                        trades: 297,
                        taker_buy_base_asset_volume: 69.163143,
                        taker_buy_quote_asset_volume: 265471.08613083,
                        ignore: 0
                    }
                },
                id: 'trigger-41'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-04T21:00:00.000Z',
                    initialPrice: 3764.24,
                    trend: 1.9119397275412902,
                    expires: '2019-01-05T21:00:00.000Z',
                    assetAmount: 0.02653922,
                    exitAt: '2019-01-05T05:53:00.000Z',
                    exitPrice: 3836.21,
                    exitCandle: {
                        _id: '5d036528d023ee0011f8ea11',
                        start: '2019-01-05T05:54:00.000Z',
                        open: 3834.73,
                        high: 3840.99,
                        low: 3834.73,
                        close: 3836.21,
                        volume: 90.906122,
                        end_time: 1546667579999,
                        quote_asset_volume: 348870.73571141,
                        trades: 297,
                        taker_buy_base_asset_volume: 69.163143,
                        taker_buy_quote_asset_volume: 265471.08613083,
                        ignore: 0
                    }
                },
                id: 'trigger-51'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T00:00:00.000Z',
                    initialPrice: 3770.96,
                    trend: 2.145872669028578,
                    expires: '2019-01-07T00:00:00.000Z',
                    assetAmount: 0.02649192,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-58'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T02:00:00.000Z',
                    initialPrice: 3765.65,
                    trend: 2.289910108480608,
                    expires: '2019-01-07T02:00:00.000Z',
                    assetAmount: 0.02652928,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-60'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T03:00:00.000Z',
                    initialPrice: 3771.82,
                    trend: 2.1225827319437287,
                    expires: '2019-01-07T03:00:00.000Z',
                    assetAmount: 0.02648588,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-61'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T04:00:00.000Z',
                    initialPrice: 3771.15,
                    trend: 2.140726303647429,
                    expires: '2019-01-07T04:00:00.000Z',
                    assetAmount: 0.02649059,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-62'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T05:00:00.000Z',
                    initialPrice: 3767.9,
                    trend: 2.2288277289736995,
                    expires: '2019-01-07T05:00:00.000Z',
                    assetAmount: 0.02651344,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-63'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T06:00:00.000Z',
                    initialPrice: 3777.75,
                    trend: 1.962279134405403,
                    expires: '2019-01-07T06:00:00.000Z',
                    assetAmount: 0.02644431,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-64'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T07:00:00.000Z',
                    initialPrice: 3772.22,
                    trend: 2.111753821357193,
                    expires: '2019-01-07T07:00:00.000Z',
                    assetAmount: 0.02648307,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-65'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T08:00:00.000Z',
                    initialPrice: 3767.94,
                    trend: 2.227742479975797,
                    expires: '2019-01-07T08:00:00.000Z',
                    assetAmount: 0.02651316,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-66'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T09:00:00.000Z',
                    initialPrice: 3772.88,
                    trend: 2.09389113886474,
                    expires: '2019-01-07T09:00:00.000Z',
                    assetAmount: 0.02647844,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-67'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T10:00:00.000Z',
                    initialPrice: 3771.3,
                    trend: 2.136663749900563,
                    expires: '2019-01-07T10:00:00.000Z',
                    assetAmount: 0.02648953,
                    exitAt: '2019-01-06T17:16:00.000Z',
                    exitPrice: 3851.88,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be4',
                        start: '2019-01-06T17:25:00.000Z',
                        open: 3828.75,
                        high: 3854.98,
                        low: 3828.75,
                        close: 3851.88,
                        volume: 297.960498,
                        end_time: 1546794959999,
                        quote_asset_volume: 1145052.64468918,
                        trades: 1475,
                        taker_buy_base_asset_volume: 229.122283,
                        taker_buy_quote_asset_volume: 880672.85881643,
                        ignore: 0
                    }
                },
                id: 'trigger-68'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-05T18:00:00.000Z',
                    initialPrice: 3801.36,
                    trend: 2.2722564437416604,
                    expires: '2019-01-07T16:00:00.000Z',
                    assetAmount: 0.02628006,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-52'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-05T19:00:00.000Z',
                    initialPrice: 3809.02,
                    trend: 2.3895910234128457,
                    expires: '2019-01-06T19:00:00.000Z',
                    assetAmount: 0.02622721,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-53'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-05T20:00:00.000Z',
                    initialPrice: 3810.98,
                    trend: 2.336931707854671,
                    expires: '2019-01-06T20:00:00.000Z',
                    assetAmount: 0.02621372,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-54'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-05T21:00:00.000Z',
                    initialPrice: 3803.68,
                    trend: 2.5333361376351355,
                    expires: '2019-01-06T21:00:00.000Z',
                    assetAmount: 0.02626403,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-55'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-05T22:00:00.000Z',
                    initialPrice: 3806.57,
                    trend: 2.455491426664945,
                    expires: '2019-01-06T22:00:00.000Z',
                    assetAmount: 0.02624409,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-56'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-05T23:00:00.000Z',
                    initialPrice: 3786.62,
                    trend: 2.995283392577023,
                    expires: '2019-01-06T23:00:00.000Z',
                    assetAmount: 0.02638236,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-57'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T01:00:00.000Z',
                    initialPrice: 3786.76,
                    trend: 2.991475562222051,
                    expires: '2019-01-07T01:00:00.000Z',
                    assetAmount: 0.02638139,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-59'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T11:00:00.000Z',
                    initialPrice: 3796.99,
                    trend: 2.7139918725095455,
                    expires: '2019-01-07T11:00:00.000Z',
                    assetAmount: 0.02631031,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-69'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T12:00:00.000Z',
                    initialPrice: 3814.24,
                    trend: 2.249465162129289,
                    expires: '2019-01-07T12:00:00.000Z',
                    assetAmount: 0.02619132,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-70'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T13:00:00.000Z',
                    initialPrice: 3790.81,
                    trend: 2.8814422247488007,
                    expires: '2019-01-07T13:00:00.000Z',
                    assetAmount: 0.0263532,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-71'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T14:00:00.000Z',
                    initialPrice: 3798.61,
                    trend: 2.6701872527055905,
                    expires: '2019-01-07T14:00:00.000Z',
                    assetAmount: 0.02629909,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-72'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T15:00:00.000Z',
                    initialPrice: 3801.35,
                    trend: 2.5961829350099324,
                    expires: '2019-01-07T15:00:00.000Z',
                    assetAmount: 0.02628013,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-73'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-06T16:00:00.000Z',
                    initialPrice: 3806.82,
                    trend: 2.44876300954602,
                    expires: '2019-01-07T16:00:00.000Z',
                    assetAmount: 0.02624237,
                    exitAt: '2019-01-06T17:17:00.000Z',
                    exitPrice: 3900.04,
                    exitCandle: {
                        _id: '5d03652ed023ee0011f94be5',
                        start: '2019-01-06T17:29:00.000Z',
                        open: 3854.95,
                        high: 3900.99,
                        low: 3851.93,
                        close: 3900.04,
                        volume: 560.638424,
                        end_time: 1546795019999,
                        quote_asset_volume: 2174738.74801146,
                        trades: 3075,
                        taker_buy_base_asset_volume: 423.510384,
                        taker_buy_quote_asset_volume: 1642752.1038939,
                        ignore: 0
                    }
                },
                id: 'trigger-74'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T03:00:00.000Z',
                    initialPrice: 3949.16,
                    trend: 1.9371208054371056,
                    expires: '2019-01-09T03:00:00.000Z',
                    assetAmount: 0.02529651,
                    exitAt: '2019-01-08T13:43:00.000Z',
                    exitPrice: 4025.66,
                    exitCandle: {
                        _id: '5d036571d023ee0011f9ca18',
                        start: '2019-01-08T13:48:00.000Z',
                        open: 4009.43,
                        high: 4039,
                        low: 4008.91,
                        close: 4025.66,
                        volume: 451.042701,
                        end_time: 1546954979999,
                        quote_asset_volume: 1816880.4881326,
                        trades: 1724,
                        taker_buy_base_asset_volume: 232.572235,
                        taker_buy_quote_asset_volume: 936707.3587809,
                        ignore: 0
                    }
                },
                id: 'trigger-86'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T04:00:00.000Z',
                    initialPrice: 3945.61,
                    trend: 2.028837112639103,
                    expires: '2019-01-09T04:00:00.000Z',
                    assetAmount: 0.02531927,
                    exitAt: '2019-01-08T13:43:00.000Z',
                    exitPrice: 4025.66,
                    exitCandle: {
                        _id: '5d036571d023ee0011f9ca18',
                        start: '2019-01-08T13:48:00.000Z',
                        open: 4009.43,
                        high: 4039,
                        low: 4008.91,
                        close: 4025.66,
                        volume: 451.042701,
                        end_time: 1546954979999,
                        quote_asset_volume: 1816880.4881326,
                        trades: 1724,
                        taker_buy_base_asset_volume: 232.572235,
                        taker_buy_quote_asset_volume: 936707.3587809,
                        ignore: 0
                    }
                },
                id: 'trigger-87'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T05:00:00.000Z',
                    initialPrice: 3944.88,
                    trend: 2.0477175478087988,
                    expires: '2019-01-09T05:00:00.000Z',
                    assetAmount: 0.02532396,
                    exitAt: '2019-01-08T13:43:00.000Z',
                    exitPrice: 4025.66,
                    exitCandle: {
                        _id: '5d036571d023ee0011f9ca18',
                        start: '2019-01-08T13:48:00.000Z',
                        open: 4009.43,
                        high: 4039,
                        low: 4008.91,
                        close: 4025.66,
                        volume: 451.042701,
                        end_time: 1546954979999,
                        quote_asset_volume: 1816880.4881326,
                        trades: 1724,
                        taker_buy_base_asset_volume: 232.572235,
                        taker_buy_quote_asset_volume: 936707.3587809,
                        ignore: 0
                    }
                },
                id: 'trigger-88'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T06:00:00.000Z',
                    initialPrice: 3950.49,
                    trend: 1.902801930899713,
                    expires: '2019-01-09T06:00:00.000Z',
                    assetAmount: 0.025288,
                    exitAt: '2019-01-08T13:43:00.000Z',
                    exitPrice: 4025.66,
                    exitCandle: {
                        _id: '5d036571d023ee0011f9ca18',
                        start: '2019-01-08T13:48:00.000Z',
                        open: 4009.43,
                        high: 4039,
                        low: 4008.91,
                        close: 4025.66,
                        volume: 451.042701,
                        end_time: 1546954979999,
                        quote_asset_volume: 1816880.4881326,
                        trades: 1724,
                        taker_buy_base_asset_volume: 232.572235,
                        taker_buy_quote_asset_volume: 936707.3587809,
                        ignore: 0
                    }
                },
                id: 'trigger-89'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T07:00:00.000Z',
                    initialPrice: 3958.56,
                    trend: 1.695060830200879,
                    expires: '2019-01-09T07:00:00.000Z',
                    assetAmount: 0.02523644,
                    exitAt: '2019-01-08T13:43:00.000Z',
                    exitPrice: 4025.66,
                    exitCandle: {
                        _id: '5d036571d023ee0011f9ca18',
                        start: '2019-01-08T13:48:00.000Z',
                        open: 4009.43,
                        high: 4039,
                        low: 4008.91,
                        close: 4025.66,
                        volume: 451.042701,
                        end_time: 1546954979999,
                        quote_asset_volume: 1816880.4881326,
                        trades: 1724,
                        taker_buy_base_asset_volume: 232.572235,
                        taker_buy_quote_asset_volume: 936707.3587809,
                        ignore: 0
                    }
                },
                id: 'trigger-90'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T08:00:00.000Z',
                    initialPrice: 3953.6,
                    trend: 1.822642654795628,
                    expires: '2019-01-09T08:00:00.000Z',
                    assetAmount: 0.02526811,
                    exitAt: '2019-01-08T13:43:00.000Z',
                    exitPrice: 4025.66,
                    exitCandle: {
                        _id: '5d036571d023ee0011f9ca18',
                        start: '2019-01-08T13:48:00.000Z',
                        open: 4009.43,
                        high: 4039,
                        low: 4008.91,
                        close: 4025.66,
                        volume: 451.042701,
                        end_time: 1546954979999,
                        quote_asset_volume: 1816880.4881326,
                        trades: 1724,
                        taker_buy_base_asset_volume: 232.572235,
                        taker_buy_quote_asset_volume: 936707.3587809,
                        ignore: 0
                    }
                },
                id: 'trigger-91'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T16:00:00.000Z',
                    initialPrice: 3969.91,
                    trend: 2.0695683277454733,
                    expires: '2019-01-08T16:00:00.000Z',
                    assetAmount: 0.02516429,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-75'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T17:00:00.000Z',
                    initialPrice: 3978.96,
                    trend: 1.8374148018577752,
                    expires: '2019-01-08T17:00:00.000Z',
                    assetAmount: 0.02510706,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-76'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T18:00:00.000Z',
                    initialPrice: 3979.34,
                    trend: 1.8276900189478662,
                    expires: '2019-01-08T18:00:00.000Z',
                    assetAmount: 0.02510466,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-77'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T19:00:00.000Z',
                    initialPrice: 3977.89,
                    trend: 1.864807724698277,
                    expires: '2019-01-08T19:00:00.000Z',
                    assetAmount: 0.02511381,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-78'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T21:00:00.000Z',
                    initialPrice: 3970.96,
                    trend: 2.0425791244434626,
                    expires: '2019-01-08T21:00:00.000Z',
                    assetAmount: 0.02515764,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-80'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T22:00:00.000Z',
                    initialPrice: 3971.98,
                    trend: 2.016374704807178,
                    expires: '2019-01-08T22:00:00.000Z',
                    assetAmount: 0.02515118,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-81'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T23:00:00.000Z',
                    initialPrice: 3964.81,
                    trend: 2.2008620841856286,
                    expires: '2019-01-08T23:00:00.000Z',
                    assetAmount: 0.02519666,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-82'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T00:00:00.000Z',
                    initialPrice: 3975.45,
                    trend: 1.9273289816247305,
                    expires: '2019-01-09T00:00:00.000Z',
                    assetAmount: 0.02512923,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-83'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T02:00:00.000Z',
                    initialPrice: 3961.03,
                    trend: 2.2983920848870105,
                    expires: '2019-01-09T02:00:00.000Z',
                    assetAmount: 0.02522071,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-85'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T09:00:00.000Z',
                    initialPrice: 3960.64,
                    trend: 2.3084652985376177,
                    expires: '2019-01-09T09:00:00.000Z',
                    assetAmount: 0.02522319,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-92'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T10:00:00.000Z',
                    initialPrice: 3973.62,
                    trend: 1.9742703127123449,
                    expires: '2019-01-09T10:00:00.000Z',
                    assetAmount: 0.0251408,
                    exitAt: '2019-01-08T15:39:00.000Z',
                    exitPrice: 4052.07,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce88',
                        start: '2019-01-08T15:49:00.000Z',
                        open: 4033.27,
                        high: 4059.16,
                        low: 4033.27,
                        close: 4052.07,
                        volume: 276.527273,
                        end_time: 1546961939999,
                        quote_asset_volume: 1118750.42067462,
                        trades: 1199,
                        taker_buy_base_asset_volume: 219.386206,
                        taker_buy_quote_asset_volume: 887406.39598425,
                        ignore: 0
                    }
                },
                id: 'trigger-93'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-07T20:00:00.000Z',
                    initialPrice: 3988.52,
                    trend: 1.580285419152974,
                    expires: '2019-01-08T20:00:00.000Z',
                    assetAmount: 0.02504688,
                    exitAt: '2019-01-08T15:40:00.000Z',
                    exitPrice: 4051.55,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce89',
                        start: '2019-01-08T15:43:00.000Z',
                        open: 4052.07,
                        high: 4069.8,
                        low: 4051.53,
                        close: 4051.55,
                        volume: 480.169523,
                        end_time: 1546961999999,
                        quote_asset_volume: 1949316.70922932,
                        trades: 1523,
                        taker_buy_base_asset_volume: 252.926993,
                        taker_buy_quote_asset_volume: 1027092.76313542,
                        ignore: 0
                    }
                },
                id: 'trigger-79'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T01:00:00.000Z',
                    initialPrice: 3981.12,
                    trend: 1.7691001527208496,
                    expires: '2019-01-09T01:00:00.000Z',
                    assetAmount: 0.02509344,
                    exitAt: '2019-01-08T15:40:00.000Z',
                    exitPrice: 4051.55,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce89',
                        start: '2019-01-08T15:43:00.000Z',
                        open: 4052.07,
                        high: 4069.8,
                        low: 4051.53,
                        close: 4051.55,
                        volume: 480.169523,
                        end_time: 1546961999999,
                        quote_asset_volume: 1949316.70922932,
                        trades: 1523,
                        taker_buy_base_asset_volume: 252.926993,
                        taker_buy_quote_asset_volume: 1027092.76313542,
                        ignore: 0
                    }
                },
                id: 'trigger-84'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T11:00:00.000Z',
                    initialPrice: 3980.69,
                    trend: 1.7800934008928133,
                    expires: '2019-01-09T11:00:00.000Z',
                    assetAmount: 0.02509615,
                    exitAt: '2019-01-08T15:40:00.000Z',
                    exitPrice: 4051.55,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce89',
                        start: '2019-01-08T15:43:00.000Z',
                        open: 4052.07,
                        high: 4069.8,
                        low: 4051.53,
                        close: 4051.55,
                        volume: 480.169523,
                        end_time: 1546961999999,
                        quote_asset_volume: 1949316.70922932,
                        trades: 1523,
                        taker_buy_base_asset_volume: 252.926993,
                        taker_buy_quote_asset_volume: 1027092.76313542,
                        ignore: 0
                    }
                },
                id: 'trigger-94'
            },
            {
                what: 'TAKEPROFIT',
                meta: {
                    initialStart: '2019-01-08T13:00:00.000Z',
                    initialPrice: 3988.83,
                    trend: 1.572390901592704,
                    expires: '2019-01-09T13:00:00.000Z',
                    assetAmount: 0.02504493,
                    exitAt: '2019-01-08T15:40:00.000Z',
                    exitPrice: 4051.55,
                    exitCandle: {
                        _id: '5d036572d023ee0011f9ce89',
                        start: '2019-01-08T15:43:00.000Z',
                        open: 4052.07,
                        high: 4069.8,
                        low: 4051.53,
                        close: 4051.55,
                        volume: 480.169523,
                        end_time: 1546961999999,
                        quote_asset_volume: 1949316.70922932,
                        trades: 1523,
                        taker_buy_base_asset_volume: 252.926993,
                        taker_buy_quote_asset_volume: 1027092.76313542,
                        ignore: 0
                    }
                },
                id: 'trigger-95'
            }
        ]
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        // case backtestAction.PUSH_FORM_DATA: {
        //     return {
        //         ...state,
        //         formData: action.formData
        //     }
        // }
        case backtestAction.BACKTEST_RESET: {
            return initialState;
        }
        case backtestAction.BEGIN_BACKTEST: {
            return {
                ...state,
                isLoading: true,
                response: null,
                isError: false,
                errorMessage: null
            }
        }
        case backtestAction.BACKTEST_DONE: {
            return {
                ...state,
                isLoading: false,
                response: action.response,
                isError: false,
                errorMessage: null,
            }
        }
        case backtestAction.BACKTEST_ERROR: {
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: "" + action.error,
                response: null
            }
        }
        default:
            return state;
    }
}