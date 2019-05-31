import {overviewAction} from "../actions/Overview";
const initialState = {
    portfolios: [],
    isLoading: false,
    isError: false,
    isLoaded: false,
}
export default (state = initialState, action) => {
    switch (action.type) {
        case overviewAction.EXPIRED_PORTFOLIO: {
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            }
        }
        case overviewAction.BEGIN_LOAD_PORTFOLIO:
            return {
                ...state,
                isLoading: true
            }
        case overviewAction.LOAD_PORTFOLIO_DONE:
            return {
                ...state,
                isLoading: false,
                portfolios: action.portfolios,
                isLoaded: true
            }
        case overviewAction.LOAD_PORTFOLIO_ERROR:
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