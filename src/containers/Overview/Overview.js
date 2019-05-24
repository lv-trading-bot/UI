import Overview from '../../views/Overview';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.overview
    }
}

const mapDispatchToProps = dispatch => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
