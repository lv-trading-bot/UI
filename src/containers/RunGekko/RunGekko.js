import RunGekko from '../../views/RunGekko';
import {connect} from 'react-redux';
import {runGekko} from '../../actions/Gekko';
import {backtest, backtestReset} from '../../actions/Backtest'

const mapStateToProps = (state, ownProps) => {
    return {
      ...state.gekko,
      backtest: state.backtest
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      runGekko: (config) => dispatch(runGekko(config)),
      // pushFromDataToBacktest: (formData) => dispatch(pushFormData(formData)),
      runBacktest: (config) => dispatch(backtest(config)),
      resetBacktest: () => dispatch(backtestReset())
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RunGekko);
