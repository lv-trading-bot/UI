import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Pair from './Pair';
import _ from 'lodash';

class Overview extends Component {

  renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

  componentDidMount() {
    if(!this.props.isLoaded && !this.props.isLoading) {
      this.props.loadPortfolio();
    }
    if(!this.props.status.isLoaded && !this.props.status.isLoading) {
      this.props.loadStatus();
    }
    if(!this.props.pairControl.isLoaded && !this.props.pairControl.isLoading) {
      this.props.loadPairControl();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.isLoaded && !nextProps.isLoading) {
      this.props.loadPortfolio();
    }
    if(!nextProps.status.isLoaded && !nextProps.status.isLoading) {
      this.props.loadStatus();
    }
    if(!nextProps.pairControl.isLoaded && !nextProps.pairControl.isLoading) {
      this.props.loadPairControl();
    }
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
                      <th>Accept Buy</th>
                      <th>Set By</th>
                      <th>Last Change</th>
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
                      onClick={() => this.props.switchToPairDetail(pair.asset_name, pair.currency_name, pair.id)}
                      props_pair_control={this.props.pairControl}
                      putPairControl={this.props.putPairControl}
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
