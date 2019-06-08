import {gekkoAction} from "../actions/Gekko";
const initialState = {
    isLoading: false,
    isError: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case gekkoAction.BEGIN_GEKKO:
            return {
                ...state,
                isLoading: true
            }
        case gekkoAction.GEKKO_DONE:
            return {
                ...state,
                isLoading: false
            }
        case gekkoAction.GEKKO_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: ("" + action.error)
            }
        default:
            return state;
    }
}