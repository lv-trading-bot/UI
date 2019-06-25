import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Table, CardFooter, Button, Badge } from 'reactstrap';
import ReactJson from 'react-json-view';
import _ from 'lodash';
import moment from 'moment';
import DateTime from '../RunGekko/Fields/DateTime';
import BacktestChart from './BacktestChart';

class BacktestResult extends Component {

	state = {
		backtestDaterange: {},
		isSubmitting: false
	}

	renderLoading = () => <div className="animated fadeIn pt-1 pb-2 text-center"><i className="fa fa-spinner fa-spin"></i>{" Backtesting..."}</div>

	renderError = (error) => <div className="animated fadeIn pt-1 pb-2 text-center text-danger">{error}</div>

	componentDidMount() {
		// if (!this.props.formData) {
		// 	this.props.history.push("/run-gekko");
		// }
	}

	componentWillReceiveProps(nextProps) {
	}

	onChangeDataOfFields = (field, val) => {
		this.setState({
			backtestDaterange: {
				...this.state.backtestDaterange,
				[field]: val
			}
		})
	}

	backtest = () => {
		this.setState({ isSubmitting: true }, () => {
			let isValid = !_.isEmpty(this.state.backtestDaterange.from) && !_.isEmpty(this.state.backtestDaterange.to);
			if (isValid && this.props.isValidFormData) {
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
		let errMessageFrom = undefined, errMessageTo = undefined;
		if (_.isEmpty(this.state.backtestDaterange["from"])) {
			errMessageFrom = "Date range from field is required";
		} else if ((new Date(this.state.backtestDaterange["from"])).getTime() > (new Date()).getTime()){
			errMessageFrom = "Date range from must before now";
		}

		if (_.isEmpty(this.state.backtestDaterange["to"])) {
			errMessageTo = "Date range to field is required";
		} else if ((new Date(this.state.backtestDaterange["to"])).getTime() > (new Date()).getTime()){
			errMessageTo = "Date range to must before now";
		}

		if (!_.isEmpty(this.state.backtestDaterange["from"]) && !_.isEmpty(this.state.backtestDaterange["to"])) {
			if ((new Date(this.state.backtestDaterange["from"])).getTime() > (new Date(this.state.backtestDaterange["to"])).getTime()) {
				errMessageTo = "Date range to must after from";
			}
		}


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
						isError={!_.isEmpty(errMessageFrom)}
						isSubmitting={this.state.isSubmitting}
						disable={this.props.isLoading}
						errorMessage={errMessageFrom}
					/>
					<DateTime
						label="Backtest date range to"
						nameField="to"
						placeholder="02/01/2019 00:00:00"
						description="Backtest end at"
						formData={this.state.backtestDaterange}
						value={this.state.backtestDaterange.to}
						onChange={this.onChangeDataOfFields}
						isError={!_.isEmpty(errMessageTo)}
						isSubmitting={this.state.isSubmitting}
						disable={this.props.isLoading}
						errorMessage={errMessageTo}
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
						{/* <Button type="button" size="sm" color="danger" onClick={this.runGekko}>Run</Button> */}
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
					name: "Profitabe Trigger",
					value: _.filter(roundtrips, c => c.what && parseFloat(_.get(c, "meta.exitPrice", 0)) > parseFloat(_.get(c, "meta.initialPrice", 0))).length
				},
				{
					name: "Lost Making Trigger",
					value: _.filter(roundtrips, c => c.what && parseFloat(_.get(c, "meta.exitPrice", 0)) <= parseFloat(_.get(c, "meta.initialPrice", 0))).length
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
		let triggerList = this.props.response.roundtrips;
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
						let trend = (100 * ((parseFloat(trigger.meta.exitPrice) - parseFloat(trigger.meta.initialPrice)) / parseFloat(trigger.meta.initialPrice))).toFixed(5);
						return (
							<tr key={index}>
								<td>{moment(meta.initialStart).format('YYYY-MM-DD HH:mm')}</td>
								<td>{moment.duration(moment(meta.exitAt).diff(moment(meta.initialStart))).asHours().toFixed(2)}</td>
								<td>{meta.initialPrice}</td>
								<td>{meta.exitPrice}</td>
								<td>{(trend > 0 ? (<Badge color="success">{trend + " %"}</Badge>) : (<Badge color="danger">{trend + " %"}</Badge>))}</td>
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
					<BacktestChart 
						roundtrips={this.props.response.roundtrips} 
						candles={this.props.response.candles}
					/>
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
		if (!this.props.isValidFormData) {
			return <div className="animated fadeIn pt-1 pb-2 text-center text-danger">{"Config is not valid"}</div>
		}

		return (
			<React.Fragment>
				{this.renderFormBacktestDaterange()}
				{this.renderResult()}
			</React.Fragment>
		)
	}
}

export default BacktestResult;
