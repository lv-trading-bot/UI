import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, FormGroup, Label, Input } from 'reactstrap';
import _ from 'lodash';
import { genarateAssetCurrencyId } from '../../utils';

class Trigger extends Component {
  /**
   * 
  running trigger
  {
      "_id" : ObjectId("5ce32a383e9ff300102ecbc0"),
      "id" : "trigger-9",
      "at" : "2019-05-20T22:29:00.000Z",
      "type" : "doubleStop",
      "properties" : {
          "initialStart" : "2019-05-20T22:29:00.000Z",
          "initialPrice" : 8005.44,
          "currentInitialPrice" : 7969.14,
          "stopLoss" : -10,
          "takeProfit" : 2,
          "expires" : "2019-05-22T20:29:00.000Z",
          "assetAmount" : 0.01248016
      }
  }

  completed trigger
  {
    "_id" : ObjectId("5ce30e1a3e9ff300102ecbb7"),
    "what" : "TAKEPROFIT",
    "meta" : {
        "initialStart" : "2019-05-20T20:29:00.000Z",
        "initialPrice" : 7783.97,
        "trend" : 1.93320375078526,
        "expires" : "2019-05-21T20:29:00.000Z",
        "exitPrice" : 7934.45,
        "exitCandle" : {
            "start" : "2019-05-20T20:46:00.000Z",
            "open" : 7919,
            "high" : 7939.99,
            "low" : 7906.32,
            "close" : 7934.45,
            "vwp" : 7923.77196839963,
            "volume" : 195.018281,
            "trades" : 1439
        }
    },
    "id" : "trigger-8"
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

    // Check xem trigger của pair đó đã nạp chưa
    if (nextPair.asset_name && nextPair.currency_name && nextPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(nextPair.asset_name, nextPair.currency_name, nextPair.id);
      if (!nextProps[assetCurrencyId] || (!nextProps[assetCurrencyId].isLoaded && !nextProps[assetCurrencyId].isLoading)) {
        this.props.loadTrigger(nextPair.id, nextPair.asset_name, nextPair.currency_name);
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

  renderTableRunningTrigger = () => {
    let curPair = this.props.pair, props = this.props;
    if (curPair.asset_name && curPair.currency_name && curPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);
      if (!props[assetCurrencyId] || props[assetCurrencyId].isLoading) {
        return this.renderLoading();
      }
      if (props[assetCurrencyId].isError) {
        return this.renderError();
      }
      let runningTriggers = _.filter(props[assetCurrencyId].triggers, trigger => {
        return !trigger.what;
      })

      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Type</th>
              <th>Initial Price</th>
              <th>Current Initial Price</th>
              <th>Stop Loss</th>
              <th>Take Profit</th>
              <th>Expires</th>
              <th>Asset Amount</th>
              <th>Trend</th>
              <th>Start At</th>
            </tr>
          </thead>
          <tbody>
            {_.map(runningTriggers, (trigger, index) => {
              return (
                <tr key={index}>
                  <td>{trigger.id}</td>
                  <td>{trigger.type}</td>
                  <td>{trigger.properties.initialPrice}</td>
                  <td>{trigger.properties.currentInitialPrice}</td>
                  <td>{trigger.properties.stopLoss}</td>
                  <td>{trigger.properties.takeProfit}</td>
                  <td>{trigger.properties.expires}</td>
                  <td>{`${trigger.properties.assetAmount} ${curPair.asset_name}`}</td>
                  <td>{"{null}"}</td>
                  <td>{trigger.at}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )
    }
    return this.renderRequireChoose();
  }

  renderTableCompletedTrigger = () => {
    let curPair = this.props.pair, props = this.props;
    if (curPair.asset_name && curPair.currency_name && curPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);
      if (!props[assetCurrencyId] || props[assetCurrencyId].isLoading) {
        return this.renderLoading();
      }
      if (props[assetCurrencyId].isError) {
        return this.renderError();
      }
      let completedTriggers = _.filter(props[assetCurrencyId].triggers, trigger => {
        return trigger.what;
      })

      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th>Id</th>
              <th>Reason</th>
              <th>Initial Price</th>
              <th>Exit price</th>
              <th>Profit (%)</th>
              <th>Expires</th>
              <th>Asset Amount</th>
              <th>Start At</th>
              <th>Stop At</th>
            </tr>
          </thead>
          <tbody>
            {_.map(completedTriggers, (trigger, index) => {
              return (
                <tr key={index}>
                  <td>{trigger.id}</td>
                  <td>{trigger.what}</td>
                  <td>{trigger.meta.initialPrice}</td>
                  <td>{trigger.meta.exitPrice}</td>
                  <td>{`${trigger.meta.trend.toFixed(5)} %`}</td>
                  <td>{trigger.meta.expires}</td>
                  <td>{trigger.meta.assetAmount}</td>
                  <td>{trigger.meta.initialStart}</td>
                  <td>{trigger.meta.exitAt}</td>
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
                <div>
                  <strong>Running Trigger</strong>
                  {this.renderTableRunningTrigger()}
                </div>
                <div>
                  <strong>Completed Trigger</strong>
                  {this.renderTableCompletedTrigger()}
                  {/* <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Trigger;
