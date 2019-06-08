import Overview from '../../views/Overview';
import {connect} from 'react-redux';
import {loadPortfolio} from '../../actions/Overview';
import {loadStatus} from '../../actions/Status';
import {loadPairControl, putPairControl} from '../../actions/PairControl';
import {startGekko, stopGekko} from '../../actions/Gekko';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.overview,
        status: state.status,
        pairControl: state.pairControl,
        gekko: state.gekko
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      loadPortfolio: (condition, sort, limit, page) => dispatch(loadPortfolio(condition, sort, limit, page)),
      loadStatus: (condition, sort, limit, page) => dispatch(loadStatus(condition, sort, limit, page)),
      loadPairControl: (condition, sort, limit, page) => dispatch(loadPairControl(condition, sort, limit, page)),
      putPairControl: (id, asset, currency, accept_buy, set_by) => dispatch(putPairControl(id, asset, currency, accept_buy, set_by)),
      switchToPairDetail: (asset_name, currency_name, id) => {
        ownProps.history.push(`/pair-detail/${asset_name}/${currency_name}/${id}`);
      },
      startGekko: (containerName) => dispatch(startGekko(containerName)),
      stopGekko: (containerName) => dispatch(stopGekko(containerName))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
