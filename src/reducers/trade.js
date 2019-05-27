import {tradeAction} from "../actions/Trade";
import {genarateAssetCurrencyId} from '../utils';
const initialState = {
    pair: {
        id: null,
        asset_name: null,
        currency_name: null
    },
    default: {
        trades: [],
        isLoading: false,
        isError: false,
        isLoaded: false,
        id: null,
        asset_name: null,
        currency_name: null
    }
}
export default (state = initialState, action) => {
    let assetCurrencyId = genarateAssetCurrencyId(action.asset_name, action.currency_name, action.id);
    switch (action.type) {
        case tradeAction.CHANGE_PAIR_TRADE: {
            return {
                ...state,
                pair: {
                    id: action.id,
                    asset_name: action.asset_name,
                    currency_name: action.currency_name
                }
            }
        }
        case tradeAction.BEGIN_LOAD_TRADE:
            {
                let newState = {
                    ...state
                };

                newState[assetCurrencyId] = {
                    ...newState[assetCurrencyId],
                    isLoading: true
                };
                return newState;
            }
        case tradeAction.LOAD_TRADE_DONE:
            {
                let newState = {
                    ...state
                };

                newState[assetCurrencyId] = {
                    ...newState[assetCurrencyId],
                    isLoading: false,
                    trades: action.trades,
                    isLoaded: true
                };
                return newState;
            }
        case tradeAction.LOAD_TRADE_ERROR:
            {
                let newState = {
                    ...state
                };

                newState[assetCurrencyId] = {
                    ...newState[assetCurrencyId],
                    isLoading: false,
                    isError: true,
                    errorMessage: ("" + action.error),
                    isLoaded: true
                };
                return newState;
            }
        default:
            return state;
    }
}