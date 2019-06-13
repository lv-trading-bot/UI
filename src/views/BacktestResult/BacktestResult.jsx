import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, CardFooter, Button } from 'reactstrap';
import ReactJson from 'react-json-view';
import _ from 'lodash';
import moment from 'moment';
import DateTime from '../RunGekko/Fields/DateTime';

class BacktestResult extends Component {

	state = {
		backtestDaterange: {},
		isSubmitting: false
	}

	renderLoading = () => <div className="animated fadeIn pt-1 pb-2 text-center"><i className="fa fa-spinner fa-spin"></i>{" Backtesting..."}</div>

	renderError = (error) => <div className="animated fadeIn pt-1 pb-2 text-center text-danger">{error}</div>

	componentDidMount() {
		if (!this.props.formData) {
			this.props.history.push("/run-gekko");
		}
	}

	componentWillReceiveProps(nextProps) {
	}

	renderInfoBacktest = () => {
		let infos = [];
		let formData = this.props.formData;
		if (true) {
			infos = [
				{
					name: "Asset Name",
					value: formData.asset_name
				},
				{
					name: "Currency Name",
					value: formData.currency_name
				},
				{
					name: "Candle Size",
					value: formData.candleSize
				},
				{
					name: "Stop Loss",
					value: formData.stopLoss
				},
				{
					name: "Take Profit",
					value: formData.takeProfit
				},
				{
					name: "Amount For One Trade",
					value: formData.amountForOneTrade
				},
				{
					name: "Expiration Period",
					value: formData.expirationPeriod
				},
				{
					name: "Decision Threshold",
					value: formData.decisionThreshold
				},
				{
					name: "Model Type",
					value: formData.model_type
				},
				{
					name: "Model Name",
					value: formData.model_name
				},
				{
					name: "Lag",
					value: formData.lag
				},
				{
					name: "Features",
					value: formData.features
				},
				{
					name: "Rolling Step",
					value: formData.rolling_step
				},
				{
					name: "Train Daterange from",
					value: moment(formData.train_daterange.from).format("DD-MM-YYYY HH:mm")
				},
				{
					name: "Train Daterange to",
					value: moment(formData.train_daterange.to).format("DD-MM-YYYY HH:mm")
				}
			];
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
							if (info.name.toLowerCase() === 'features') {
								return (
									<tr key={index}>
										<td>{info.name}</td>
										<td>
											<ReactJson src={info.value} name={false} theme={"flat"} iconStyle="circle" displayDataTypes={false} collapsed={1} />
										</td>
									</tr>
								)
							}
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
	}

	onChangeDataOfFields = (field, val) => {
		this.setState({
			backtestDaterange: {
				...this.state.backtestDaterange,
				[field]: val
			}
		})
	}

	runGekko = () => {
		this.props.runGekko(this.props.formData);
		this.props.history.push('/overview');
    }

    backtest = () => {
        this.setState({ isSubmitting: true }, () => {
            let isValid = !_.isEmpty(this.state.backtestDaterange.from) && !_.isEmpty(this.state.backtestDaterange.to);
            if (isValid) {
				this.props.backtest({
					...this.props.formData, 
					backtest_daterange: {
						from: this.state.backtestDaterange.from,
						to: this.state.backtestDaterange.to
					}
				})
            }
        })
    }

	renderFormBacktestDaterange = () => {
		return (
			<Card>
				<CardHeader>
					<strong><i className="icon-info pr-1"></i>{
						`Input backtest date range`
					}</strong>
				</CardHeader>
				<CardBody>
					<DateTime
						label="Backtest date range from"
						nameField="from"
						placeholder="01/01/2019 00:00:00"
						description="Backtest begin at"
						formData={this.state.backtestDaterange}
						value={this.state.backtestDaterange.from}
						onChange={this.onChangeDataOfFields}
						isError={_.isEmpty(this.state.backtestDaterange["from"])}
						isSubmitting={this.state.isSubmitting}
						disable={this.props.isLoading}
						errorMessage={_.isEmpty(this.state.backtestDaterange["from"]) ? "Date range from field is required" : undefined}
					/>
					<DateTime
						label="Backtest date range to"
						nameField="to"
						placeholder="02/01/2019 00:00:00"
						description="Backtest end at"
						formData={this.state.backtestDaterange}
						value={this.state.backtestDaterange.to}
						onChange={this.onChangeDataOfFields}
						isError={_.isEmpty(this.state.backtestDaterange["to"])}
						isSubmitting={this.state.isSubmitting}
						disable={this.props.isLoading}
						errorMessage={_.isEmpty(this.state.backtestDaterange["to"]) ? "Date range to field is required" : undefined}
					/>
				</CardBody>
				<CardFooter>
					<div style={{ textAlign: "right" }}>
						<Button 
							type="button" 
							size="sm" 
							color="primary" 
							onClick={this.backtest}
							disabled={this.props.isLoading}
						>{/*<i className="fa fa-dot-circle-o"></i>*/}Backtest</Button>
						<Button type="button" size="sm" color="danger" onClick={this.runGekko}>{/*<i className="fa fa-ban"></i>*/}Run</Button>
					</div>
				</CardFooter>
			</Card>
		)
	}

	renderBacktestResult = () => {
		let performanceReport = this.props.response.performanceReport || {};
		let roundtrips = this.props.response.roundtrips || [];
		let infos = [];
		if (true) {
			infos = [
				{
					name: "Total Trigger",
					value: roundtrips.length
				},
				{
					name: "Lost Making Trigger",
					value: _.filter(roundtrips, roundtrip => _.toLower(roundtrip.what) === 'stoploss').length
				},
				{
					name: "Profitabe Trigger",
					value: _.filter(roundtrips, roundtrip => _.toLower(roundtrip.what) === 'takeprofit').length
				},
				{
					name: "Expired Trigger",
					value: _.filter(roundtrips, roundtrip => _.toLower(roundtrip.what) === 'expires').length
				},
				{
					name: "Total Trade",
					value: performanceReport.trades
				},
				{
					name: "Start Time",
					value: moment(performanceReport.startTime).format("DD-MM-YYYY HH:mm")
				},
				{
					name: "End Time",
					value: moment(performanceReport.endTime).format("DD-MM-YYYY HH:mm")
				},
				{
					name: "Time Span",
					value: moment.duration(moment(performanceReport.endTime).diff(moment(performanceReport.startTime))).humanize()
				},
				{
					name: "Start Price",
					value: performanceReport.startPrice
				},
				{
					name: "End Price",
					value: performanceReport.endPrice
				},
				{
					name: "Market",
					value: performanceReport.market + " %"
				},
				{
					name: "Start Balance",
					value: performanceReport.startBalance
				},
				{
					name: "Lowest Balance",
					value: performanceReport.lowestBalance
				},
				{
					name: "Current Balance",
					value: performanceReport.balance
				},
				{
					name: "Profit",
					value: performanceReport.profit
				},
				{
					name: "Relative Profit",
					value: performanceReport.relativeProfit + " %"
				},
			];
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
							if (info.name.toLowerCase() === 'features') {
								return (
									<tr key={index}>
										<td>{info.name}</td>
										<td>
											<ReactJson src={info.value} name={false} theme={"flat"} iconStyle="circle" displayDataTypes={false} collapsed={1} />
										</td>
									</tr>
								)
							}
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
	}

	renderRoundTrip = () => {
		let triggerList = this.props.response.roundtrips;;
		return (
			<Table responsive striped>
				<thead>
					<tr>
						<th>entry date (UTC)</th>
						<th>hold(h)</th>
						<th>buy</th>
						<th>sell</th>
						<th>profit</th>
					</tr>
				</thead>
				<tbody>
					{_.map(triggerList, (trigger, index) => {
						let meta = trigger.meta;
						return (
							<tr key={index}>
								<td>{moment(meta.initialStart).format('YYYY-MM-DD HH:mm')}</td>
								<td>{moment.duration(moment(meta.exitAt).diff(moment(meta.initialStart))).asHours().toFixed(2)}</td>
								<td>{meta.initialPrice}</td>
								<td>{meta.exitPrice}</td>
								<td>{((meta.exitPrice - meta.initialPrice) * 100 / meta.initialPrice).toFixed(2) + " %"}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		)
	}

	renderResult = () => {
		if (this.props.isLoading) {
			return this.renderLoading();
		}

		if (this.props.isError) {
			return this.renderError(this.props.errorMessage);
		}

		if (this.props.response) {
			return (
				<React.Fragment>
					<Card>
						<CardHeader>
							<strong><i className="icon-info pr-1"></i>{
								`Result`
							}</strong>
						</CardHeader>
						<CardBody>
							{this.renderBacktestResult()}
						</CardBody>
					</Card>
					<Card>
						<CardHeader>
							<strong><i className="icon-info pr-1"></i>{
								`Round trip`
							}</strong>
						</CardHeader>
						<CardBody>
							{this.renderRoundTrip()}
						</CardBody>
					</Card>
				</React.Fragment>
			)
		}

		return (<div />);
	}

	render() {
		if (!this.props.formData) {
			return this.renderLoading();
		}

		return (
			<div className="animated fadeIn">
				<Row>
					<Col sm={{ size: 12 }} md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
						<Card>
							<CardHeader>
								<strong><i className="icon-info pr-1"></i>{
									`Info`
								}</strong>
							</CardHeader>
							<CardBody>
								{this.renderInfoBacktest()}
							</CardBody>
						</Card>
						{this.renderFormBacktestDaterange()}
						{this.renderResult()}
					</Col>
				</Row>
			</div>
		)
	}
}

export default BacktestResult;
