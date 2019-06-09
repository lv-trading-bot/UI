import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';
import { genarateAssetCurrencyId } from '../../utils';
import Filter from '../../components/Filter';
import moment from 'moment';
import { defaultLimtOfAPage } from '../../constans/paging'

class Trade extends Component {

	renderLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

	renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

	renderRequireChoose = () => <div className="animated fadeIn pt-1 text-center">Please Choose a Pair.</div>

	state = {
		page: 1
	}

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

		// Check xem trade của pair đó đã nạp chưa
		if (nextPair.asset_name && nextPair.currency_name && nextPair.id) {
			let assetCurrencyId = genarateAssetCurrencyId(nextPair.asset_name, nextPair.currency_name, nextPair.id);
			if (!nextProps[assetCurrencyId] || (!nextProps[assetCurrencyId].isLoaded && !nextProps[assetCurrencyId].isLoading)) {
				this.props.loadTrade(nextPair.id, nextPair.asset_name, nextPair.currency_name);
			}
		}
	}

	changePage = (nextPage) => {
		debugger
		let curPair = this.props.pair, props = this.props;
		let assetCurrencyId = genarateAssetCurrencyId(curPair.asset_name, curPair.currency_name, curPair.id);
		if (nextPage < this.state.page && nextPage < 1) {
			return;
		}
		if (nextPage > this.state.page && (props[assetCurrencyId].trades && props[assetCurrencyId].trades.length < defaultLimtOfAPage)) {
			return;
		}

		this.props.loadTrade(curPair.id, curPair.asset_name, curPair.currency_name, undefined, undefined, undefined, nextPage);
		this.setState({ page: nextPage });
		// id, asset_name, currency_name, condition, sort, limit, page
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
				<React.Fragment>
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
							{_.map(_.cloneDeep(props[assetCurrencyId].trades), (trade, index) => {
								let isBuy = trade.action.toLowerCase() === 'buy';
								return (
									<tr key={index}>
										<td>{trade.id}</td>
										<td>{trade.adviceId}</td>
										<td>{trade.price}</td>
										<td>{`${trade.amount * (isBuy ? trade.price : 1)} ${(isBuy ? curPair.currency_name : curPair.asset_name)}`}</td>
										<td>{`${trade.amountWithFee * (isBuy ? 1 : trade.price)} ${(isBuy ? curPair.asset_name : curPair.currency_name)}`}</td>
										<td>{moment(trade.date).format("DD-MM-YYYY HH:mm")}</td>
										<td>{trade.cost.toFixed(5)}</td>
										<td>
											{(isBuy ?
												(<Badge color="success">Buy</Badge>)
												: (<Badge color="danger">Sell</Badge>))}
										</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
					<Pagination>
						<PaginationItem>
							<PaginationLink previous tag="button" onClick={() => this.changePage(this.state.page - 1)}>Prev</PaginationLink>
						</PaginationItem>
						<PaginationItem active>
							<PaginationLink tag="button" disabled>{this.state.page}</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink next tag="button" onClick={() => this.changePage(this.state.page + 1)}>Next</PaginationLink>
						</PaginationItem>
					</Pagination>
				</React.Fragment>
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
									name={"Trade"}
								/>
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
