import {configAction} from "../actions/Config";
const initialState = {
    pair: {
        id: null,
        asset_name: null,
        currency_name: null
    },
    configs: [],
    isLoading: false,
    isError: false,
    isLoaded: false,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case configAction.EXPIRED_CONFIG: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            }
        }
        case configAction.CHANGE_PAIR_CONFIG: {
            return {
                ...state,
                pair: {
                    id: action.id,
                    asset_name: action.asset_name,
                    currency_name: action.currency_name
                }
            }
        }
        case configAction.BEGIN_LOAD_CONFIG:
            return {
                ...state,
                isLoading: true
            }
        case configAction.LOAD_CONFIG_DONE:
            return {
                ...state,
                isLoading: false,
                configs: action.configs,
                isLoaded: true
            }
        case configAction.LOAD_CONFIG_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: ("" + action.error),
                isLoaded: true
            }
        default:
            return state;
    }
}