import React, { Component } from 'react'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import Proptypes from 'prop-types';

class Filter extends Component {
    renderOptionAssetName = () => {
        let listAssetNameFromPortfolio = _.map(this.props.overview.portfolios, pair => {
            return pair.asset_name;
        })

        listAssetNameFromPortfolio = _.uniq(listAssetNameFromPortfolio);
        return _.map(listAssetNameFromPortfolio, (asset_name, index) => {
            return <option key={index} value={asset_name}>{asset_name}</option>;
        })
    }

    renderOptionCurrencyName = () => {
        let listCurrency = _.filter(this.props.overview.portfolios, pair => {
            return pair.asset_name === this.props.pair.asset_name;
        })
        let listCurrencyNameFromPortfolio = _.map(listCurrency, pair => {
            return pair.currency_name;
        })

        listCurrencyNameFromPortfolio = _.uniq(listCurrencyNameFromPortfolio);
        return _.map(listCurrencyNameFromPortfolio, (currency_name, index) => {
            return <option key={index} value={currency_name}>{currency_name}</option>;
        })
    }

    renderOptionId = () => {
        let listId = _.filter(this.props.overview.portfolios, pair => {
            return (pair.asset_name === this.props.pair.asset_name
                && pair.currency_name === this.props.pair.currency_name);
        })
        let listIdFromPortfolio = _.map(listId, pair => {
            return pair.id;
        })

        return _.map(listIdFromPortfolio, (id, index) => {
            return <option key={index} value={id}>{id}</option>;
        })
    }
    onChangeFilter(type, _value) {
        let value = _value;
        if (_value === "null") {
            value = null;
        }
        switch (type) {
            case 'asset_name':
                this.props.changePair(null, value, null);
                break;
            case 'currency_name':
                this.props.changePair(null, this.props.pair.asset_name, value);
                break;
            case 'id':
                this.props.changePair(value, this.props.pair.asset_name, this.props.pair.currency_name);
                break;

            default:
                break;
        }
    }
    render() {
        return (
            <Row>
                <Col xs="2"><strong><i className="icon-info pr-1"></i>{this.props.name}</strong></Col>
                <Col xs="3">
                    <FormGroup>
                        <Label htmlFor="casset">Asset Name</Label>
                        <Input type="select" name="casset" id="casset"
                            value={this.props.pair.asset_name || ""}
                            onChange={(e) => this.onChangeFilter("asset_name", e.target.value)}>
                            {this.renderOptionAssetName()}
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="3">
                    <FormGroup>
                        <Label htmlFor="ccurrency">Currency Name</Label>
                        <Input type="select" name="ccurrency" id="ccurrency"
                            value={this.props.pair.currency_name || ""}
                            onChange={(e) => this.onChangeFilter("currency_name", e.target.value)}>
                            <option value={"null"}>Choose Currency Name</option>
                            {this.renderOptionCurrencyName()}
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs="4">
                    <FormGroup>
                        <Label htmlFor="cid">Id</Label>
                        <Input type="select" name="cid" id="cid"
                            value={this.props.pair.id || ""}
                            onChange={(e) => this.onChangeFilter("id", e.target.value)}>
                            <option value={"null"}>Choose id</option>
                            {this.renderOptionId()}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

Filter.propTypes = {
    overview: Proptypes.object.isRequired,
    pair: Proptypes.object.isRequired,
    changePair: Proptypes.func.isRequired,
    name: Proptypes.string
}

export default Filter;