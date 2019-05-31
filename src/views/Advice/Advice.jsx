import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import _ from 'lodash';
import ReactJson from 'react-json-view';
import { genarateAssetCurrencyId } from '../../utils';
import Filter from '../../components/Filter';

class Advice extends Component {

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
      && this.props.overview.portfolios.length > 0){
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

    // Check xem advice của pair đó đã nạp chưa
    if (nextPair.asset_name && nextPair.currency_name && nextPair.id) {
      let assetCurrencyId = genarateAssetCurrencyId(nextPair.asset_name, nextPair.currency_name, nextPair.id);
      if (!nextProps[assetCurrencyId] || (!nextProps[assetCurrencyId].isLoaded && !nextProps[assetCurrencyId].isLoading)) {
        this.props.loadAdvice(nextPair.id, nextPair.asset_name, nextPair.currency_name);
      }
    }
  }

  renderTableAdvice = () => {
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
              <th>At</th>
              <th>Body</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {_.map(_.reverse(_.cloneDeep(props[assetCurrencyId].advices)), (advice, index) => {
              return (
                <tr key={index}>
                  <td>{advice.at}</td>
                  <td>
                    <ReactJson 
                      src={_.omit(advice.body, ['id', 'asset', 'currency', '_id'])} 
                      name={false} theme={"flat"} 
                      iconStyle="circle" displayDataTypes={false} 
                      collapsed={true}
                    />
                  </td>
                  <td>{advice.errMess 
                    ? <div className="pt-1 text-center text-danger">{advice.errMess}</div>
                    : <div className="animated fadeIn pt-1 text-center text-danger">{advice.result}</div>
                    }</td>
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
                  name={"Advice"}
                />
              </CardHeader>
              <CardBody>
                {this.renderTableAdvice()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Advice;
