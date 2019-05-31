import {statusAction} from "../actions/Status";
const initialState = {
    statuss: [],
    isLoading: false,
    isError: false,
    isLoaded: false,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case statusAction.EXPIRED_STATUS: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            }
        }
        case statusAction.BEGIN_LOAD_STATUS:
            return {
                ...state,
                isLoading: true
            }
        case statusAction.LOAD_STATUS_DONE:
            return {
                ...state,
                isLoading: false,
                statuss: action.statuss,
                isLoaded: true
            }
        case statusAction.LOAD_STATUS_ERROR:
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