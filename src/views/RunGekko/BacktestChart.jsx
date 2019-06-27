import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import _ from 'lodash';
import 'hammerjs';
import 'chartjs-plugin-zoom';

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
    },
    pan: {
        enabled: true,
        mode: 'xy'
    },
    zoom: {
        enabled: true,
        mode: 'xy'
    }
}

class Charts extends Component {

    splitRoundtripToBuyAndSell = (roundtrips) => {
        let buys = [], sells = [];
        for (let i = 0; i < roundtrips.length; i++) {
            buys.push({ x: roundtrips[i].meta.initialStart, y: roundtrips[i].meta.initialPrice });
            sells.push({ x: roundtrips[i].meta.exitAt, y: roundtrips[i].meta.exitPrice })
        }

        return { buys, sells }
    }

    mapCandlesToDateAndPrice = (candles) => {
        return _.map(candles, candle => {
            return {
                x: candle.start,
                y: candle.close
            }
        })
    }
    render() {
        let { buys, sells } = this.splitRoundtripToBuyAndSell(this.props.roundtrips || []);
        let candlesForVisualization = this.mapCandlesToDateAndPrice(this.props.candles || []);
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
                    data: candlesForVisualization,
                    showLine: true
                },
            ],
        };
        return (
            <Card>
                <CardHeader className="d-flex justify-content-between align-items-center">
                    <strong><i className="icon-info pr-1"></i>{
                        `visualization`
                    }</strong>
                    <Button 
                        outline 
                        color="primary" 
                        title="Reset zoom" 
                        onClick={() => { this.chartRef.chartInstance.resetZoom()}}
                    >
                        <i className="icon-refresh icons"></i>
                    </Button>
                </CardHeader>
                <CardBody>
                    <div className="chart-wrapper" style={{height: '500px'}}>
                        <Line data={line} options={options} ref={ref => this.chartRef = ref} />
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Charts;
