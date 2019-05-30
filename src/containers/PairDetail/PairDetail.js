import PairDetail from '../../views/PairDetail/PairDetail';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';
import {changePair, loadConfig} from '../../actions/Config';
import {loadTrigger} from '../../actions/Trigger';
import {loadTrade} from '../../actions/Trade';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.config,
        overview: state.overview,
        trigger: state.trigger,
        trade: state.trade
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
      loadConfig: (condition, sort, limit, page) => dispatch(loadConfig(condition, sort, limit, page)),
      loadTrigger: (id, asset_name, currency_name, condition, sort, limit, page) => 
        dispatch(loadTrigger(id, asset_name, currency_name, condition, sort, limit, page)),
      loadTrade: (id, asset_name, currency_name, condition, sort, limit, page) => 
        dispatch(loadTrade(id, asset_name, currency_name, condition, sort, limit, page)),
      changePair: (id, asset_name, currency_name) => dispatch(changePair(id, asset_name, currency_name)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(PairDetail);
