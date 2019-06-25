import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const baseUrl = " https://api.binance.com";
const apiGetKlines = "/api/v1/klines";
const limit = 1000;

const sellPointColor = "#f86c6b", buyPointColor = "#4dbd74", priceColor = "#63c2de";

const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            type: 'time',
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Date'
            },
            time: {
                tooltipFormat: 'MMM DD YYYY HH:mm:ss',
            },

        }],
        yAxes: [{
            type: 'linear',
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Price'
            },
        }],
    }
}

class Charts extends Component {

    state = {
        historyPrice: []
    }

    componentDidMount() {
        let thisPerformanceReport = this.props.performanceReport;
        this.loadHistoryPrice(thisPerformanceReport.startTime,
            thisPerformanceReport.endTime,
            this.props.candleSize,
            this.props.market.exchange,
            this.props.market.asset,
            this.props.market.currency)
    }

    componentWillReceiveProps(nextProps) {
        let thisPerformanceReport = this.props.performanceReport;
        let nextPerformanceReport = nextProps.performanceReport;

        if (thisPerformanceReport.startTime !== nextPerformanceReport.startTime
            || this.performanceReport.endTime !== nextPerformanceReport.endTime) {
            this.loadHistoryPrice(
                nextPerformanceReport.startTime,
                nextPerformanceReport.endTime,
                nextProps.candleSize,
                nextProps.market.exchange,
                nextProps.market.asset,
                nextProps.market.currency);
        }
    }

    loadHistoryPrice = (startTime, endTime, candleSize, exchange, asset, currency) => {
        const convertCandleSize = (_candleSize) => {
            return "1m";
        }

        let url = baseUrl + apiGetKlines;

        let reqData = {
            symbol: `${_.upperCase(asset)}${_.upperCase(currency)}`,
            startTime: moment(startTime).utc().startOf('minute').utc().unix() * 1000,
            endTime: moment(endTime).utc().startOf('minute').unix() * 1000 - 1,
            limit,
            interval: convertCandleSize(candleSize)
        }

        axios.get(url, {
            params: reqData
        })
            .then((res) => {
                debugger;
            })
            .catch(err => {
                debugger;
            })
    }

    splitRoundtripToBuyAndSell = (roundtrips) => {
        let buys = [], sells = [];
        for (let i = 0; i < roundtrips.length; i++) {
            buys.push({ x: roundtrips[i].meta.initialStart, y: roundtrips[i].meta.initialPrice });
            sells.push({ x: roundtrips[i].meta.exitAt, y: roundtrips[i].meta.exitPrice })
        }

        return { buys, sells }
    }
    render() {
        let { buys, sells } = this.splitRoundtripToBuyAndSell(this.props.roundtrips || []);
        console.log(this.props.performanceReport)
        let line = {
            datasets: [
                {
                    label: 'Buy',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: buyPointColor,
                    borderColor: buyPointColor,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: buyPointColor,
                    pointBackgroundColor: buyPointColor,
                    pointBorderWidth: 7,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: buyPointColor,
                    pointHoverBorderColor: buyPointColor,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: buys,
                    showLine: false
                },
                {
                    label: 'Sell',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: sellPointColor,
                    borderColor: sellPointColor,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: sellPointColor,
                    pointBackgroundColor: sellPointColor,
                    pointBorderWidth: 7,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: sellPointColor,
                    pointHoverBorderColor: sellPointColor,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: sells,
                    showLine: false
                },
                {
                    label: 'Price',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: priceColor,
                    borderColor: priceColor,
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: priceColor,
                    pointBackgroundColor: priceColor,
                    pointBorderWidth: 1,
                    pointHoverRadius: 1,
                    pointHoverBackgroundColor: priceColor,
                    pointHoverBorderColor: priceColor,
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.historyPrice,
                    showLine: true
                },
            ],
        };
        return (
            <div className="chart-wrapper">
                <Line data={line} options={options} height={500} />
            </div>
        );
    }
}

export default Charts;
