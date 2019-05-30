import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge } from 'reactstrap';
import _ from 'lodash';
import ReactJson from 'react-json-view';

class Status extends Component {

  renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

  componentDidMount() {
    this.props.loadStatus();
  }

  render() {
    if(this.props.isLoading) {
      return this.renderLoading();
    }

    if(this.props.isError) {
      return this.renderError(this.props.errorMessage);
    }

    let listStatuss = _.get(this.props, 'statuss', []);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"></i>Status</strong>
              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>Random Id</th>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Meta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(listStatuss, (status, index) => (
                      <tr key={index}>
                        <td>{status.random_id}</td>
                        <td>{status.name}</td>
                        <td>{((status.status && status.status.toLowerCase() === 'connected') 
                          ? (<Badge color="success">{status.status}</Badge>)
                          : <Badge color="danger">{status.status}</Badge>)}</td>
                        <td>
                          <ReactJson src={_.omit(status, ['random_id', 'name', 'status', '_id'])} name={false} theme={"flat"} iconStyle="circle" displayDataTypes={false} />
                        </td>
                      </tr>
                    ))}
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

export default Status;
