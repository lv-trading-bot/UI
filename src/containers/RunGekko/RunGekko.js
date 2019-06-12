import RunGekko from '../../views/RunGekko';
import {connect} from 'react-redux';
import {runGekko} from '../../actions/Gekko';
import {pushFormData} from '../../actions/Backtest'

const mapStateToProps = (state, ownProps) => {
    return {
      ...state.gekko
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      runGekko: (config) => dispatch(runGekko(config)),
      pushFromDataToBacktest: (formData) => dispatch(pushFormData(formData))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RunGekko);
