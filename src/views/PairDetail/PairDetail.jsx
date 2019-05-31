import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import ReactJson from 'react-json-view';
import _ from 'lodash';
import moment from 'moment';
import { genarateAssetCurrencyId } from '../../utils';
import Filter from '../../components/Filter';

class PairDetail extends Component {

  renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

  renderRequireChoose = () => <div className="animated fadeIn pt-1 text-center">Please Choose a Pair.</div>

  componentDidMount() {
    if (!this.props.overview.isLoaded) {
      this.props.loadPortfolio();
    }
    if (!this.props.isLoaded) {
      this.props.loadConfig();
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

    let assetCurrencyId = genarateAssetCurrencyId(nextPair.asset_name, nextPair.currency_name, nextPair.id);

    // Check xem trigger của pair đó đã nạp chưa
    if (nextPair.asset_name && nextPair.currency_name && nextPair.id) {
      if (!nextProps.trigger[assetCurrencyId] || (!nextProps.trigger[assetCurrencyId].isLoaded && !nextProps.trigger[assetCurrencyId].isLoading)) {
        this.props.loadTrigger(nextPair.id, nextPair.asset_name, nextPair.currency_name);
      }
    }

    // Check xem trade của pair đó đã nạp chưa
    if (nextPair.asset_name && nextPair.currency_name && nextPair.id) {
      if (!nextProps.trade[assetCurrencyId] || (!nextProps.trade[assetCurrencyId].isLoaded && !nextProps.trade[assetCurrencyId].isLoading)) {
        this.props.loadTrade(nextPair.id, nextPair.asset_name, nextPair.currency_name);
      }
    }
  }

  renderContentPairDetail = () => {
    let curPair = this.props.pair, props = this.props;
    if (curPair.asset_name && curPair.currency_name && curPair.id) {
      if (this.props.isLoading) {
        return this.renderLoading();
      }

      if (this.props.isError) {
        return this.renderError(this.props.errorMessage);
      }

      let curPortfolio = _.find(props.overview.portfolios, portfolio => portfolio.id === curPair.id);
      let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);
      let curListTrigger = _.get(props, `trigger.${assetCurrencyId}.triggers`, []);
      let curListTrade = _.get(props, `trade.${assetCurrencyId}.trades`, []);

      let tong_tien_trade_ban = _.filter(curListTrade, c => c.action.toLowerCase() === 'sell').reduce((res, v) => res + (v.amount * v.effectivePrice), 0);
      let tong_asset_dang_giu = _.filter(curListTrigger, c => !c.what).reduce((res, v) => res + v.properties.assetAmount, 0);
      let tong_tien_trade_mua = _.filter(curListTrade, c => c.action.toLowerCase() === 'buy').reduce((res, v) => res + v.amount, 0);
      let estimatedProfit = tong_tien_trade_ban + (tong_asset_dang_giu * curPortfolio.price) - tong_tien_trade_mua;

      let infos = [];
      if (curPortfolio) {
        infos = [
          {
            name: "Start time",
            value: _.get(curPortfolio, "startTime", ""),
            description: "Thời gian bắt đầu"
          },
          { 
            name: "Time span", 
            value: curPortfolio.startTime ? moment(curPortfolio.startTime).fromNow() : "", 
            description: "Thời gian tiêu tốn" 
          },
          { 
            name: "Number of triggers", 
            value: curListTrigger.length, 
            description: "Tổng số các trigger" 
          },
          { 
            name: "Number of profitable triggers", 
            value: _.filter(curListTrigger, c => c.what && c.what.toLowerCase() === 'takeprofit').length, 
            description: "Số lượng trigger lời" 
          },
          { 
            name: "Number of loss-making triggers", 
            value: _.filter(curListTrigger, c => c.what && c.what.toLowerCase() === 'stoploss').length, 
            description: "Số lượng trigger lỗ" 
          },
          { 
            name: "Number of expired triggers", 
            value: _.filter(curListTrigger, c => c.what && c.what.toLowerCase() === 'expires').length, 
            description: "Số lượng trigger hết hạn" 
          },
          { 
            name: "Number of running triggers", 
            value: _.filter(curListTrigger, c => !c.what).length, 
            description: "Số lượng trigger đang chạy" 
          },
          { 
            name: "Estimated profit", 
            value: estimatedProfit + ` ${curPair.currency_name}`, 
            description: "((tổng số tiền trade bán + số asset đang giữ của con đó * price) - tổng số tiền trade mua === số tiền lời)" 
          },
          { 
            name: "Current price", 
            value: `${curPortfolio.price} (${curPortfolio.last_update ? moment(curPortfolio.last_update).fromNow() : "unknown"})`, 
            description: "" 
          },
          { 
            name: "Asset", 
            value: `${curPortfolio.asset} ${curPortfolio.asset_name}`, 
            description: "" 
          },
          { 
            name: "Currency", 
            value: `${curPortfolio.currency} ${curPortfolio.currency_name}`, 
            description: "" 
          },
          { 
            name: "Original balance", 
            value: (parseFloat(_.get(curPortfolio, "initPortfolio.currency", 0)) 
                  + parseFloat(_.get(curPortfolio, "initPortfolio.asset", 0)) 
                  * parseFloat(_.get(curPortfolio, "initPortfolio.price", 0))) 
                  + ` ${curPortfolio.currency_name}`, 
            description: "" 
          },
          { 
            name: "Estimated balance", 
            value: (parseFloat(curPortfolio.currency) 
            + parseFloat(curPortfolio.asset) 
            * parseFloat(curPortfolio.price))
            + ` ${curPortfolio.currency_name}`, 
            description: "" 
          },
          { 
            name: "Start price", 
            value: _.get(curPortfolio, "initPortfolio.price", 0), 
            description: "" 
          },
          { 
            name: "Market (%)", 
            value: (100 * (parseFloat(_.get(curPortfolio, "price", 0)) 
                  - parseFloat(_.get(curPortfolio, "initPortfolio.price", 0)))
                  / parseFloat(_.get(curPortfolio, "initPortfolio.price", 0))).toFixed(5) + " %", 
            description: "" 
          },
        ];
      }
      return (
        <Table responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {_.map(infos, (info, index) => {
              return (
                <tr key={index}>
                  <td>{info.name}</td>
                  <td>{info.value}</td>
                  <td>{info.description}</td>
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
    let curPair = this.props.pair;
    let curConfig = _.find(this.props.configs, config => config.id === curPair.id);
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
                  name={"Trade"}
                />
              </CardHeader>
              <CardBody>
                {this.renderContentPairDetail()}
              </CardBody>
            </Card>
          </Col>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Config</strong>
              </CardHeader>
              <CardBody>
                <ReactJson src={curConfig} name={false} theme={"flat"} iconStyle="circle" displayDataTypes={false} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default PairDetail;
