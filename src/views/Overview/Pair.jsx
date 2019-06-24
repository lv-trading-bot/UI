import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import Proptypes from 'prop-types';
import moment from 'moment';

import _ from 'lodash';

class Pair extends Component {

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
        // return (status.status.toLowerCase() === "connected") ?
        //     (<Badge color="success" title={status.status} pill>{" "}</Badge>)
        //     : (<Badge color="danger" title={status.status} pill>{ }</Badge>)
        return (status.status.toLowerCase() === "connected") ?
            (<i className="fa fa-circle text-success" title={status.status}></i>)
            : (<i className="fa fa-circle text-danger" title={status.status}></i>)
    }

    renderPairControl = (id, asset_name, currency_name) => {
        if (this.props.props_pair_control.isLoading) {
            return (<td>{this.renderLoading()}</td>)
        }

        if (this.props.props_pair_control.isError) {
            return (<td>{this.renderError(this.props.props_pair_control.errorMessage)}</td>)
        }

        let listPairControl = this.props.props_pair_control.pairControls;
        let pairControl = _.find(listPairControl, pair => pair.id === id) || {accept_buy: true, set_by: "unknown"};

        let listRes = [];
        listRes.push(<td 
            style={{cursor: "pointer", textAlign: "center"}}
            key={"accep_buy"}
            onClick={() => this.props.putPairControl(id, asset_name, currency_name, !pairControl.accept_buy, 'User')}
            >
                {(pairControl.accept_buy) ?
                (<Badge color="success" title={moment(pairControl.last_update).format("DD-MM-YYYY HH:mm")}>true</Badge>)
                : (<Badge color="danger" title={moment(pairControl.last_update).format("DD-MM-YYYY HH:mm")}>false</Badge>)}
            </td>)

        listRes.push(<td key={"set_by"}>{pairControl.set_by}</td>);
        // listRes.push(<td key={"last_update"}>{moment(pairControl.last_update).format("DD-MM-YYYY HH:mm")}</td>);

        let listStatus = this.props.props_status.statuss;
        let status = _.find(listStatus, stt => stt.id === id) || {status: "unknown"};

        let actionEl = null;
        if(!this.props.gekko.isLoading) {
            actionEl = (
                <td key={"action"} style={{textAlign: "center"}}>
                    {status.containerName 
                    ? (status.status.toLowerCase() === "connected") 
                        ? (<Badge 
                            color="danger" 
                            style={{cursor: "pointer"}}
                            onClick={() => this.props.stopGekko(status.containerName)}
                            >{"Stop"}</Badge>)
                        : (<Badge 
                            color="success" 
                            style={{cursor: "pointer"}}
                            onClick={() => this.props.startGekko(status.containerName)}
                            >{"Start"}</Badge>)
                    : (<span className="text-danger">{"No control"}</span>)}
                </td>)
        } else {
            actionEl = <td key={"action"}><span>Loading...</span></td>
        }
        
        listRes.push(actionEl);
        return listRes;
    }

    render() {
        return (
            <tr>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}}>
                    {this.renderStatus(this.props.id)}{" " + this.props.id}
                </td>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}}>{moment(this.props.startTime).format("DD-MM-YYYY HH:mm")}</td>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}}>{`${this.props.asset_name}_${this.props.currency_name}`}</td>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}}>{`${this.props.asset.toLocaleString()} ${this.props.asset_name}`}</td>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}}>{`${this.props.currency.toLocaleString()} ${this.props.currency_name}`}</td>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}} title={moment(this.props.last_update).fromNow()}>{this.props.price.toLocaleString()}</td>
                <td onClick={this.props.onClick} style={{cursor: "pointer"}}>{`${(this.props.currency + this.props.asset * this.props.price).toLocaleString()} ${this.props.currency_name}`}</td>
                {/* <td onClick={this.props.onClick} style={{cursor: "pointer"}}>{moment(this.props.last_update).fromNow()}</td> */}
                {/* <td onClick={this.props.onClick} style={{cursor: "pointer", textAlign: "center"}}>{this.renderStatus(this.props.id)}</td> */}
                {this.renderPairControl(this.props.id, this.props.asset_name, this.props.currency_name)}
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
    props_pair_control: Proptypes.object,
    onClick: Proptypes.func.isRequired,
    putPairControl: Proptypes.func.isRequired,
    startGekko: Proptypes.func.isRequired,
    stopGekko: Proptypes.func.isRequired,
    gekko: Proptypes.object
}

export default Pair;