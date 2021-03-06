import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import _ from 'lodash';
import { genarateAssetCurrencyId } from '../../utils';
import Filter from '../../components/Filter';
import moment from 'moment';

class Trigger extends Component {

  renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

  renderRequireChoose = () => <div className="animated fadeIn pt-1 text-center">Please Choose a Pair.</div>

  componentDidMount() {
    let curPair = this.props.pair;
    if (!this.props.overview.isLoaded) {
      this.props.loadPortfolio();
    } else if (curPair.id === null
      && curPair.asset_name === null
      && curPair.currency_name === null
      && this.props.overview.portfolios.length > 0) {
      this.props.changePair(this.props.overview.portfolios[0].id,
        this.props.overview.portfolios[0].asset_name,
        this.props.overview.portfolios[0].currency_name)
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

    if (!nextProps.overview.isLoaded && !nextProps.overview.isLoading) {
      this.props.loadPortfolio();
    }
  }

  renderTableSumary = () => {
    let curPair = this.props.pair, props = this.props;
    let curPortfolio = _.find(props.overview.portfolios, portfolio => portfolio.id === curPair.id);

    if (curPair.asset_name && curPair.currency_name && curPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);

      if (!props[assetCurrencyId] || props[assetCurrencyId].isLoading) {
        return this.renderLoading();
      }
      if (props[assetCurrencyId].isError) {
        return this.renderError(props[assetCurrencyId].errorMessage);
      }

      let listTrigger = _.get(props[assetCurrencyId], "triggers", []);

      let infos = [
        {
          name: "Current Price",
          value: `${curPortfolio.price} (${curPortfolio.last_update ? moment(curPortfolio.last_update).fromNow() : "unknown"})`
        },
        {
          name: "Running Trigger",
          value: _.filter(listTrigger, trigger => !trigger.what).length
        },
        {
          name: "Profitable Trigger",
          value: _.filter(listTrigger, c => c.what && parseFloat(_.get(c, "meta.exitPrice", 0)) > parseFloat(_.get(c, "meta.initialPrice", 0))).length
        },
        {
          name: "Loss-making Trigger",
          value: _.filter(listTrigger, c => c.what && parseFloat(_.get(c, "meta.exitPrice", 0)) <= parseFloat(_.get(c, "meta.initialPrice", 0))).length
        },
        {
          name: "Total",
          value: listTrigger.length
        }
      ]

      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {_.map(infos, (info, index) => {
              return (
                <tr key={index}>
                  <td>{info.name}</td>
                  <td>{info.value}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )
    }
    return this.renderRequireChoose();
  }

  renderTableRunningTrigger = () => {
    let curPair = this.props.pair, props = this.props;
    let curPortfolio = _.find(props.overview.portfolios, portfolio => portfolio.id === curPair.id);
    if (curPair.asset_name && curPair.currency_name && curPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);
      if (!props[assetCurrencyId] || props[assetCurrencyId].isLoading) {
        return this.renderLoading();
      }
      if (props[assetCurrencyId].isError) {
        return this.renderError(props[assetCurrencyId].errorMessage);
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
              <th>Transfered Price</th>
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
              let trend = (100 * ((parseFloat(curPortfolio.price) - parseFloat(trigger.properties.currentInitialPrice)) / parseFloat(trigger.properties.currentInitialPrice))).toFixed(5);
              return (
                <tr key={index}>
                  <td>{trigger.id}</td>
                  <td>{trigger.type}</td>
                  <td>{trigger.properties.initialPrice}</td>
                  <td>{trigger.properties.currentInitialPrice}</td>
                  <td>{trigger.properties.stopLoss}</td>
                  <td>{trigger.properties.takeProfit}</td>
                  <td>{moment(trigger.properties.expires).format("DD-MM-YYYY HH:mm")}</td>
                  <td>{`${trigger.properties.assetAmount} ${curPair.asset_name}`}</td>
                  <td>{(trend > 0 ? (<Badge color="success">{trend + " %"}</Badge>) : (<Badge color="danger">{trend + " %"}</Badge>))}</td>
                  <td>{moment(trigger.at).format("DD-MM-YYYY HH:mm")}</td>
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
        return this.renderError(props[assetCurrencyId].errorMessage);
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
              <th>Asset Amount</th>
              <th>Time Span</th>
              <th>Start At</th>
              <th>Stop At</th>
            </tr>
          </thead>
          <tbody>
            {_.map(completedTriggers, (trigger, index) => {
              let trend = (100 * ((parseFloat(trigger.meta.exitPrice) - parseFloat(trigger.meta.initialPrice)) / parseFloat(trigger.meta.initialPrice))).toFixed(5);
              return (
                <tr key={index}>
                  <td>{trigger.id}</td>
                  <td>{(trigger.what.toLowerCase() === 'takeprofit' ?
                    (<Badge color="success">{trigger.what}</Badge>)
                    : trigger.what.toLowerCase() === 'expires' ?
                      (<Badge color="warning">{trigger.what}</Badge>)
                      : (<Badge color="danger">{trigger.what}</Badge>))}</td>
                  <td>{trigger.meta.initialPrice}</td>
                  <td>{trigger.meta.exitPrice}</td>
                  <td>{(trend > 0 ? (<Badge color="success">{trend + " %"}</Badge>) : (<Badge color="danger">{trend + " %"}</Badge>))}</td>
                  <td>{trigger.meta.assetAmount}</td>
                  <td>{moment.duration(moment(trigger.meta.exitAt).diff(moment(trigger.meta.initialStart))).asHours().toFixed(2) + " h"}</td>
                  <td>{moment(trigger.meta.initialStart).format("DD-MM-YYYY HH:mm")}</td>
                  <td>{moment(trigger.meta.exitAt).format("DD-MM-YYYY HH:mm")}</td>
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
                <Filter
                  overview={this.props.overview}
                  pair={this.props.pair}
                  changePair={this.props.changePair}
                  name={"Trigger"}
                />
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="6">
                    <strong>Sumary</strong>
                    {this.renderTableSumary()}
                  </Col>
                </Row>
                <div className="mt-5">
                  <strong>Running Trigger</strong>
                  {this.renderTableRunningTrigger()}
                </div>
                <div className="mt-5">
                  <strong>Completed Trigger</strong>
                  {this.renderTableCompletedTrigger()}
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
