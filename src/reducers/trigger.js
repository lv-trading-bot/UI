import {triggerAction} from "../actions/Trigger";
import {genarateAssetCurrencyId} from '../utils';
const initialState = {
    pair: {
        id: null,
        asset_name: null,
        currency_name: null
    },
    default: {
        triggers: [],
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
        case triggerAction.CHANGE_PAIR_TRIGGER: {
            return {
                ...state,
                pair: {
                    id: action.id,
                    asset_name: action.asset_name,
                    currency_name: action.currency_name
                }
            }
        }
        case triggerAction.BEGIN_LOAD_TRIGGER:
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
        case triggerAction.LOAD_TRIGGER_DONE:
            {
                let newState = {
                    ...state
                };

                newState[assetCurrencyId] = {
                    ...newState[assetCurrencyId],
                    isLoading: false,
                    triggers: action.triggers,
                    isLoaded: true
                };
                return newState;
            }
        case triggerAction.LOAD_TRIGGER_ERROR:
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