import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge, FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import { genarateAssetCurrencyId } from '../../utils';

class Trade extends Component {
  /**
   * 
  {
      "_id" : ObjectId("5ce2ce163e9ff300102ecbad"),
      "id" : "trade-4",
      "adviceId" : "advice-2",
      "action" : "sell",
      "cost" : 0.1018293803882,
      "amount" : 0.01302891,
      "price" : 7821,
      "portfolio" : {
          "asset" : 0.02574674,
          "currency" : 4801.727551
      },
      "balance" : 5003.09280454,
      "date" : "2019-05-20T15:56:00.000Z",
      "effectivePrice" : 7807.83281240041,
      "feePercent" : 0.1,
      "amountWithFee" : 101.727551
  }
   */
  renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

  renderRequireChoose = () => <div className="animated fadeIn pt-1 text-center">Please Choose a Pair.</div>

  componentDidMount() {
    if (!this.props.overview.idLoaded) {
      this.props.loadPortfolio();
    }
  }

  componentWillReceiveProps(nextProps) {
    let curPair = this.props.pair,
      nextPair = nextProps.pair;
    if (nextPair.id === null
      && nextPair.asset_name === null
      && nextPair.currency_name === null
      && curPair.id === null
      && curPair.asset_name === null
      && curPair.currency_name === null
      && nextProps.overview.isLoaded
      && nextProps.overview.portfolios.length > 0) {
      this.props.changePair(nextProps.overview.portfolios[0].id,
        nextProps.overview.portfolios[0].asset_name,
        nextProps.overview.portfolios[0].currency_name)
    }

    // Check xem trade của pair đó đã nạp chưa
    if (nextPair.asset_name && nextPair.currency_name && nextPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(nextPair.asset_name, nextPair.currency_name, nextPair.id);
      if (!nextProps[assetCurrencyId] || (!nextProps[assetCurrencyId].isLoaded && !nextProps[assetCurrencyId].isLoading)) {
        this.props.loadTrade(nextPair.id, nextPair.asset_name, nextPair.currency_name);
      }
    }
  }

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

  renderTableTrade = () => {
    let curPair = this.props.pair, props = this.props;
    if (curPair.asset_name && curPair.currency_name && curPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);
      if (!props[assetCurrencyId] || props[assetCurrencyId].isLoading) {
        return this.renderLoading();
      }

      if (props[assetCurrencyId].isError) {
        return this.renderError(props[assetCurrencyId].errorMessage);
      }

      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Advice Id</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Amount With Fee</th>
              <th>At</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {_.map(_.reverse(_.cloneDeep(props[assetCurrencyId].trades)), (trade, index) => {
              return (
                <tr key={index}>
                  <td>{trade.id}</td>
                  <td>{trade.adviceId}</td>
                  <td>{trade.price}</td>
                  <td>{`${trade.amount} ${(trade.action.toLowerCase() === 'buy' ? curPair.currency_name : curPair.asset_name)}`}</td>
                  <td>{`${trade.amountWithFee} ${(trade.action.toLowerCase() === 'buy' ? curPair.asset_name : curPair.currency_name)}`}</td>
                  <td>{trade.date}</td>
                  <td>{trade.cost.toFixed(5)}</td>
                  <td>
                    {(trade.action.toLowerCase() === 'buy' ? 
                    (<Badge color="success">Buy</Badge>) 
                    : (<Badge color="danger">Sell</Badge>))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )
    }
    return this.renderRequireChoose();
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="2"><strong><i className="icon-info pr-1"></i>Trigger</strong></Col>
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
              </CardHeader>
              <CardBody>
                {this.renderTableTrade()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Trade;
