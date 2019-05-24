import Trade from '../../views/Trade';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';
import {loadTrade, changePair} from '../../actions/Trade';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.trade,
        overview: state.overview
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
      loadTrade: (id, asset_name, currency_name, condition, sort, limit, page) => 
        dispatch(loadTrade(id, asset_name, currency_name, condition, sort, limit, page)),
      changePair: (id, asset_name, currency_name) => dispatch(changePair(id, asset_name, currency_name)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Trade);
