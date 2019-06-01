import {pairControlAction} from "../actions/PairControl";
const initialState = {
    // pair: {
    //     id: null,
    //     asset_name: null,
    //     currency_name: null
    // },
    pairControls: [],
    isLoading: false,
    isError: false,
    isLoaded: false,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case pairControlAction.EXPIRED_PAIR_CONTROL: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            }
        }
        // case pairControlAction.CHANGE_PAIR_PAIR_CONTROL: {
        //     return {
        //         ...state,
        //         pair: {
        //             id: action.id,
        //             asset_name: action.asset_name,
        //             currency_name: action.currency_name
        //         }
        //     }
        // }
        case pairControlAction.BEGIN_LOAD_PAIR_CONTROL:
            return {
                ...state,
                isLoading: true
            }
        case pairControlAction.LOAD_PAIR_CONTROL_DONE:
            return {
                ...state,
                isLoading: false,
                pairControls: action.pairControls,
                isLoaded: true
            }
        case pairControlAction.LOAD_PAIR_CONTROL_ERROR:
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