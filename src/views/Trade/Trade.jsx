import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge, FormGroup, Label, Input } from 'reactstrap';

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
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col sm={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="2"><strong><i className="icon-info pr-1"></i>Trade</strong></Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="casset">Asset</Label>
                      <Input type="select" name="casset" id="casset">
                        <option value="ETH">ETH</option>
                        <option value="BTC">BTC</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label htmlFor="ccurrency">Currency</Label>
                      <Input type="select" name="ccurrency" id="ccurrency">
                        <option>USDT</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cid">Id</Label>
                      <Input type="select" name="cid" id="cid">
                        <option>12387138817237</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
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
                    <tr>
                      <td>trade-1</td>
                      <td>advice-1</td>
                      <td>7670.47</td>
                      <td>100 USDT</td>
                      <td>0.01302891 BTC</td>
                      <td>2019-05-20T13:29:00.000Z</td>
                      <td>0.1</td>
                      <td>
                        <Badge color="success">Buy</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td>trade-4</td>
                      <td>advice-2</td>
                      <td>7821</td>
                      <td>0.01302891 BTC</td>
                      <td>101.727551 USDT</td>
                      <td>2019-05-20T15:56:00.000Z</td>
                      <td>0.1</td>
                      <td>
                        <Badge color="danger">Sell</Badge>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Trade;
