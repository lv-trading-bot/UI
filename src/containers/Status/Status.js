import Status from '../../views/Status/Status';
import {connect} from 'react-redux';
import {loadStatus} from '../../actions/Status';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadStatus: (condition, sort, limit, page) => dispatch(loadStatus(condition, sort, limit, page))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Status);
