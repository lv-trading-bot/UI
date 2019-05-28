import Overview from '../../views/Overview';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';
import {loadStatus} from '../../actions/Status';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.overview,
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
      loadStatus: (condition, sort, limit, page) => dispatch(loadStatus(condition, sort, limit, page))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
