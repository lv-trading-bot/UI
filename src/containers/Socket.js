import React from 'react';
import { connect } from 'react-redux';
import * as socket from '../lib/socket';
import { expiredAdvice } from '../actions/Advice';
import { expiredConfig } from '../actions/Config';
import { expiredPortfolio } from '../actions/Overview';
import { expiredStatus } from '../actions/Status';
import { expiredTrade } from '../actions/Trade';
import { expiredTrigger } from '../actions/Trigger';

class Socket extends React.Component {
    componentDidMount() {
        socket.connect((dataSocket => {
            let data = dataSocket.data;
            switch (dataSocket.type) {
                case "ON_POST_TRIGGER":
                case "ON_PUT_TRIGGER":
                    this.props.dispatch(expiredTrigger(data.id, data.asset, data.currency));
                    break;
                case "ON_UPDATE_PRICE":
                case "ON_PUT_PORTFOLIO":
                    this.props.dispatch(expiredPortfolio(data.id, data.asset, data.currency));
                    break;
                case "ON_POST_TRADE":
                    this.props.dispatch(expiredTrade(data.id, data.asset, data.currency));
                    break;
                case "ON_POST_ADVICE":
                    setTimeout(() => {
                        this.props.dispatch(expiredAdvice(data.id, data.asset, data.currency));
                    }, 5000);
                    break;
                case "NEW_SYSTEM_CONNECTED":
                case "SYSTEM_DISCONNECTED":
                    this.props.dispatch(expiredConfig(data.id, data.asset, data.currency));
                    this.props.dispatch(expiredStatus(data.id, data.asset, data.currency));
                    break;
                default:
                    break;
            }
        }));
    }

    render() {
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Socket);