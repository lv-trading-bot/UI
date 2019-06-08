import RunGekko from '../../views/RunGekko';
import {connect} from 'react-redux';
import {runGekko} from '../../actions/Gekko';

const mapStateToProps = (state, ownProps) => {
    return {
      ...state.gekko
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      runGekko: (config) => dispatch(runGekko(config))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RunGekko);
