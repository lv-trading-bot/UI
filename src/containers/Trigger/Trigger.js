import Trigger from '../../views/Trigger';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';
import {loadTrigger, changePair} from '../../actions/Trigger';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.trigger,
        overview: state.overview
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
      loadTrigger: (id, asset_name, currency_name, condition, sort, limit, page) => 
        dispatch(loadTrigger(id, asset_name, currency_name, condition, sort, limit, page)),
      changePair: (id, asset_name, currency_name) => dispatch(changePair(id, asset_name, currency_name)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Trigger);
