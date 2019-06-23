import { backtestAction } from "../actions/Backtest";

const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: null,
    response: null
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