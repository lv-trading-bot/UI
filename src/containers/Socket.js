import React from 'react';
import { connect } from 'react-redux';
import * as socket from '../lib/socket';

class Socket extends React.Component {
    componentDidMount() {
        socket.connect((data => {
            console.log('socket', data);
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

export default connect(mapStateToProps,mapDispatchToProps)(Socket);