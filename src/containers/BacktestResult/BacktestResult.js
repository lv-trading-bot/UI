import BacktestResult from '../../views/BacktestResult';
import {connect} from 'react-redux';
import {runGekko} from '../../actions/Gekko';
import {backtest} from '../../actions/Backtest';

const mapStateToProps = (state, ownProps) => {
    return {
      ...state.backtest
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      runGekko: (config) => dispatch(runGekko(config)),
      backtest: (config) => dispatch(backtest(config))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(BacktestResult);
