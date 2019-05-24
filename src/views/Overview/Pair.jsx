import React, { Component } from 'react';
import {Badge } from 'reactstrap';
import Proptypes from 'prop-types';

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
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{`${this.props.asset_name}_${this.props.currency_name}`}</td>
                <td>{`${this.props.asset.toLocaleString()} ${this.props.asset_name}`}</td>
                <td>{`${this.props.currency.toLocaleString()} ${this.props.currency_name}`}</td>
                <td>{this.props.price.toLocaleString()}</td>
                <td>{`${(this.props.currency + this.props.asset * this.props.price).toLocaleString()} ${this.props.currency_name}`}</td>
                <td>{this.props.last_update}</td>
                <td>
                    {(this.props.status && this.props.status.toLowerCase() === 'running') ? 
                        (<Badge color="success">{this.props.status}</Badge>)
                        : (<Badge color="danger">{this.props.status}</Badge>)
                    }
                </td>
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
    status: Proptypes.string
}

export default Pair;