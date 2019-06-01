import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import Proptypes from 'prop-types';

import _ from 'lodash';

class Pair extends Component {
    /**
     {
        "_id" : ObjectId("5ce29e03648f80fd5b64e647"),
        "asset" : 0.23932654,
        "currency" : 3123.68866898,
        "price" : 7907.25,
        "id" : "1558355458822673",
        "asset_name" : "BTC",
        "currency_name" : "USDT"
    }
     */

    renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

    renderStatus = (id) => {
        if (this.props.props_status.isLoading) {
            return this.renderLoading();
        }

        if (this.props.props_status.isError) {
            return this.renderError(this.props.props_status.errorMessage);
        }

        let listStatus = this.props.props_status.statuss;
        let status = _.find(listStatus, stt => stt.id === id) || {status: "unknown"};
        return (status.status.toLowerCase() === "connected") ?
            (<Badge color="success">{status.status}</Badge>)
            : (<Badge color="danger">{status.status}</Badge>)
    }

    render() {
        return (
            <tr onClick={this.props.onClick} style={{cursor: "pointer"}}>
                <td>{this.props.id}</td>
                <td>{`${this.props.asset_name}_${this.props.currency_name}`}</td>
                <td>{`${this.props.asset.toLocaleString()} ${this.props.asset_name}`}</td>
                <td>{`${this.props.currency.toLocaleString()} ${this.props.currency_name}`}</td>
                <td>{this.props.price.toLocaleString()}</td>
                <td>{`${(this.props.currency + this.props.asset * this.props.price).toLocaleString()} ${this.props.currency_name}`}</td>
                <td>{this.props.last_update}</td>
                <td>{this.renderStatus(this.props.id)}</td>
            </tr>
        )
    }
}

Pair.propTypes = {
    id: Proptypes.string.isRequired,
    asset: Proptypes.number.isRequired,
    currency: Proptypes.number.isRequired,
    asset_name: Proptypes.string.isRequired,
    currency_name: Proptypes.string.isRequired,
    price: Proptypes.number.isRequired,
    last_update: Proptypes.string,
    props_status: Proptypes.object,
    onClick: Proptypes.func.isRequired
}

export default Pair;