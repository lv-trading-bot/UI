import {adviceAction} from "../actions/Advice";
import {genarateAssetCurrencyId} from '../utils';
const initialState = {
    pair: {
        id: null,
        asset_name: null,
        currency_name: null
    },
    default: {
        advices: [],
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
        case adviceAction.CHANGE_PAIR_ADVICE: {
            return {
                ...state,
                pair: {
                    id: action.id,
                    asset_name: action.asset_name,
                    currency_name: action.currency_name
                }
            }
        }
        case adviceAction.BEGIN_LOAD_ADVICE:
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
        case adviceAction.LOAD_ADVICE_DONE:
            {
                let newState = {
                    ...state
                };

                newState[assetCurrencyId] = {
                    ...newState[assetCurrencyId],
                    isLoading: false,
                    advices: action.advices,
                    isLoaded: true
                };
                return newState;
            }
        case adviceAction.LOAD_ADVICE_ERROR:
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