import Advice from '../../views/Advice/Advice';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';
import {loadAdvice, changePair} from '../../actions/Advice';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.advice,
        overview: state.overview
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
      loadAdvice: (id, asset_name, currency_name, condition, sort, limit, page) => 
        dispatch(loadAdvice(id, asset_name, currency_name, condition, sort, limit, page)),
      changePair: (id, asset_name, currency_name) => dispatch(changePair(id, asset_name, currency_name)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Advice);
