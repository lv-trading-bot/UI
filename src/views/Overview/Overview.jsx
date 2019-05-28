import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Pair from './Pair';
import _ from 'lodash';

// const props = [{
//   id:"23423",
//   asset:12,
//   currency:5000,
//   asset_name:"BTC",
//   currency_name:"USDT",
//   price:7000,
//   last_update:"2019-05-12 12:00:00",
//   status:"Running"
// },{
//   id:"23423",
//   asset:100,
//   currency:5000,
//   asset_name:"ETH",
//   currency_name:"USDT",
//   price:201,
//   last_update:"2019-05-12 12:00:00",
//   status:"Running"
// }]

class Overview extends Component {

  renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

  componentDidMount() {
    this.props.loadPortfolio();
    this.props.loadStatus();
  }

  render() {
    if(this.props.isLoading) {
      return this.renderLoading();
    }

    if(this.props.isError) {
      return this.renderError(this.props.errorMessage);
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Overview</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Pair</th>
                      <th>Asset</th>
                      <th>Currency</th>
                      <th>Price</th>
                      <th>Estimated Balance</th>
                      <th>Last update</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(this.props.portfolios, (pair, index) => (<Pair
                      key={index}
                      id={pair.id}
                      asset={pair.asset}
                      currency={pair.currency}
                      asset_name={pair.asset_name}
                      currency_name={pair.currency_name}
                      price={pair.price}
                      last_update={pair.last_update}
                      props_status={this.props.status}
                    />))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Overview;
