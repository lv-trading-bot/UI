import {requestApi} from '../api/requestApi';
import {getPortfolio} from '../api/portfolio';

export const overviewAction = {
    BEGIN_LOAD_PORTFOLIO: "BEGIN_LOAD_PORTFOLIO",
    LOAD_PORTFOLIO_DONE: "LOAD_PORTFOLIO_DONE",
    LOAD_PORTFOLIO_ERROR: "LOAD_PORTFOLIO_ERROR"
}

export const beginLoadPortfolio = () => ({
    type: overviewAction.BEGIN_LOAD_PORTFOLIO
})

export const loadPortfolioDone = (portfolios) => ({
    type: overviewAction.LOAD_PORTFOLIO_DONE,
    portfolios
})

export const loadPortfolioError = (error) => ({
    type: overviewAction.LOAD_PORTFOLIO_ERROR,
    error
})

export const loadPortfolio = (condition, sort, limit, page) => {
    return (dispatch, getState) => {
        dispatch(beginLoadPortfolio());
        requestApi(getPortfolio(condition, sort, limit, page))
        .then(res => {
            dispatch(loadPortfolioDone(res));
        })
        .catch(err => {
            dispatch(loadPortfolioError(err));
        })
    }
}