import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from 'reactstrap';
import moment from 'moment';
import Text from './Fields/Text';
import Number from './Fields/Number';
import Option from './Fields/Option';
import DateTime from './Fields/DateTime';
import Json from './Fields/Json';
import _ from 'lodash';

const paramsTypeOfPostRunGekko = {
    asset_name: (val, body, key) => (
        !_.isEmpty(val) ? undefined : `${key} is required`
    ),
    currency_name: (val, body, key) => (
        !_.isEmpty(val) ? undefined : `${key} is required`
    ),
    candleSize: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    stopLoss: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    takeProfit: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    amountForOneTrade: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    expirationPeriod: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    decisionThreshold: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    stopTradeLimit: (val, body, key) => { body.stopTradeLimit = -1; return undefined; },
    breakDuration: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    model_type: (val, body, key) => {
        return !_.isEmpty(val) ? undefined : `${key} is required`
    },/* && (val === 'rolling' || val === 'fixed')*/
    model_name: (val, body, key) => {
        return !_.isEmpty(val) ? undefined : `${key} is required`
    },/* && (val === 'random_forest' || val === 'gradient_boosting')*/
    lag: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    features: (val, body, key) => (
        _.isArray(val) ? undefined : `${key} is not valid`
    ),
    // label: (val, body, key) => (
    //     !_.isEmpty(val) ? undefined : `${key} is required`
    // ),
    train_daterange: (val, body, key) => {
        return _.isObject(val) && !_.isEmpty(val.from) && !_.isEmpty(val.to) ? undefined : `${key} is not valid`
    },
    rolling_step: (val, body, key) => (
        !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    mailTag: (val, body, key) => undefined,
    mode: (val, body, key) => (
        _.isString(val) && !_.isEmpty(val) && (val === 'paper' || val === 'live') ? undefined : `${key} is paper or live`
    ), // paper || live

    // live
    key: (val, body, key) => (
        body.mode === 'paper' || (_.isString(val) && !_.isEmpty(val)) ? undefined : `${key} is not valid`
    ),
    secret: (val, body, key) => (
        body.mode === 'paper' || (_.isString(val) && !_.isEmpty(val)) ? undefined : `${key} is not valid`
    ),

    // paper
    asset: (val, body, key) => (
        body.mode === 'live'
            || !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
    currency: (val, body, key) => (
        body.mode === 'live' || !_.isNaN(parseFloat(val)) ? undefined : `${key} is not valid`
    ),
}

export default class RunGekko extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            formData: {
                label: "omlbct"
            },
            isSubmitting: false
        };
    }

    renderLoading = () => <div className="animated fadeIn pt-1 text-center text-success">Loading...</div>

    renderError = (error) => <div className="animated fadeIn pt-1 text-center text-danger">{error}</div>

    runGekko = () => {
        this.setState({ isSubmitting: true }, () => {
            let config = this.transformToDataPost(this.state.formData);
            let { isValid } = this.checkValidForm(config);
            if (isValid) {
                this.props.runGekko(config);

                this.setState({ formData: { label: "omlbct" } });
                this.props.history.push('/overview');
            }
        })
    }

    backtest = () => {
        this.setState({ isSubmitting: true }, () => {
            let config = this.transformToDataPost(this.state.formData);
            let { isValid } = this.checkValidForm(config);
            if (isValid) {
                this.props.pushFromDataToBacktest(config);
                setTimeout(() => this.props.history.push('/backtest'), 1000)
            }
        })
    }

    /**
    "asset_name": "BTC",
    "currency_name": "USDT",
    "candleSize": 60,
    "stopLoss": -10,
    "takeProfit": 2,
    "amountForOneTrade": 100,
    "expirationPeriod": 24,
    "decisionThreshold": 0.5,
    "stopTradeLimit": -100,
    "breakDuration": -1,
    "model_type": "rolling",
    "model_name": "random_forest",
    "lag": 23,
    "features": ["start", "open", "high", "low", "close", "trades", "volume",
        {
            "name": "omlbct",
            "params": {
                "takeProfit": 2,
                "stopLoss": -10,
                "expirationPeriod": 24
            }
        },
        {
            "name": "TREND_BY_DI",
            "params": {
                "period": 14
            }
        }
    ],
    "label": "omlbct",
    "train_daterange": {
        "from": "2019-01-01T00:00:00.000Z",
        "to": "2019-04-01T00:00:00.000Z"
    },
    "rolling_step": 720,
    "mode": "paper",
    "asset": 0,
    "currency": 5000
    // live
    key: "jashjdhsd",
    secret: "erueuishjd",
     */

    onChangeDataOfFields = (nameField, value) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [nameField]: value
            }
        })
    }

    transformToDataPost = (formData) => {

        let arrFeatures = ["start", {
            name: "omlbct",
            params: {
                "takeProfit": formData.takeProfit !== "" ? parseFloat(formData.takeProfit) : "",
                "stopLoss": formData.stopLoss !== "" ? parseFloat(formData.stopLoss) : "",
                "expirationPeriod": formData.expirationPeriod !== "" ? parseFloat(formData.expirationPeriod) : ""
            }
        }
        ];
        try {
            arrFeatures = _.concat(arrFeatures, JSON.parse(this.state.formData.features));
            arrFeatures = _.filter(arrFeatures, feature => (_.isString(feature) && !_.isEmpty(feature)) || (_.isString(feature.name) && !_.isEmpty(feature.name) && _.isObject(feature.params)));
        } catch (error) {

        }

        let transformedData = {
            "asset_name": _.toUpper(_.replace(formData.asset_name, " ", "")),
            "currency_name": _.toUpper(_.replace(formData.currency_name, " ", "")),
            "candleSize": !_.isEmpty(formData.candleSize) ? parseInt(formData.candleSize) : formData.candleSize,
            "stopLoss": !_.isEmpty(formData.stopLoss) ? parseFloat(formData.stopLoss) : formData.stopLoss,
            "takeProfit": !_.isEmpty(formData.takeProfit) ? parseFloat(formData.takeProfit) : formData.takeProfit,
            "amountForOneTrade": !_.isEmpty(formData.amountForOneTrade) ? parseFloat(formData.amountForOneTrade) : formData.amountForOneTrade,
            "expirationPeriod": !_.isEmpty(formData.expirationPeriod) ? parseFloat(formData.expirationPeriod) : formData.expirationPeriod,
            "decisionThreshold": !_.isEmpty(formData.decisionThreshold) ? parseFloat(formData.decisionThreshold) : formData.decisionThreshold,
            "stopTradeLimit": !_.isEmpty(formData.stopTradeLimit) ? parseFloat(formData.stopTradeLimit) : formData.stopTradeLimit,
            "breakDuration": -1,
            "model_type": formData.model_type,
            "model_name": formData.model_name,
            "lag": !_.isEmpty(formData.lag) ? parseInt(formData.lag) : formData.lag,
            "features": arrFeatures,
            "label": formData.label,
            "train_daterange": {
                "from": !_.isEmpty(formData.from) ? moment(formData.from).format() : formData.from,
                "to": !_.isEmpty(formData.to) ? moment(formData.to).format() : formData.to
            },
            "rolling_step": !_.isEmpty(formData.rolling_step) ? parseInt(formData.rolling_step) : formData.rolling_step,
            "mode": _.lowerCase(formData.mode),
            "mailTag": formData.mailTag
        }

        if (transformedData.mode === 'live') {
            transformedData.key = formData.key;
            transformedData.secret = formData.secret;
        } else if (transformedData.mode === 'paper') {
            transformedData.asset = formData.asset;
            transformedData.currency = formData.currency;
        }

        return transformedData;
    }

    checkValidForm = (transformedFormData) => {
        let errorMessage = {}, isValid = true;
        for (let key in paramsTypeOfPostRunGekko) {
            if (paramsTypeOfPostRunGekko[key](transformedFormData[key], transformedFormData, key)) {
                isValid = false;
                errorMessage[key] = paramsTypeOfPostRunGekko[key](transformedFormData[key], transformedFormData, key)
            }
        }

        return {
            errorMessage, isValid
        };
    }

    render() {
        // let arrFeatures = [];
        // try {
        //     arrFeatures = JSON.parse(this.state.formData.features);
        //     arrFeatures = _.filter(arrFeatures, feature => (_.isString(feature) && !_.isEmpty(feature)) || (_.isString(feature.name) && !_.isEmpty(feature.name) && _.isObject(feature.params)));
        // } catch (error) {

        // }


        let { errorMessage } = this.checkValidForm(this.transformToDataPost(this.state.formData));

        return (
            <Row>
                <Col sm={{ size: 12 }} md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }}>
                    <Card>
                        <CardHeader>
                            <strong>Run a new Gekko Trading</strong>
                        </CardHeader>
                        <CardBody>
                            {/* <Form action="" method="post" encType="multipart/form-data" className="form-horizontal"> */}
                            <Text
                                label="Asset Name"
                                nameField="asset_name"
                                placeholder="BTC"
                                description="Name of Asset. Example is BTC, ETH, ..."
                                formData={this.state.formData}
                                value={this.state.formData.asset_name}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["asset_name"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["asset_name"]}
                            />
                            <Text
                                label="Currency name"
                                nameField="currency_name"
                                placeholder="USDT"
                                description="Name of Currency. Example is USDT, BTC, ETH, ..."
                                formData={this.state.formData}
                                value={this.state.formData.currency_name}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["currency_name"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["currency_name"]}
                            />
                            <Number
                                label="Candle size"
                                nameField="candleSize"
                                placeholder="60"
                                description="This is a candle size of Gekko. Unit is minute"
                                formData={this.state.formData}
                                value={this.state.formData.candleSize}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["candleSize"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["candleSize"]}
                            />
                            <Number
                                label="Stop loss"
                                nameField="stopLoss"
                                placeholder="-10"
                                description="This is a threshold, gekko will sell if the profit is under the stoploss. Unit is percent"
                                formData={this.state.formData}
                                value={this.state.formData.stopLoss}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["stopLoss"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["stopLoss"]}
                            />
                            <Number
                                label="Take profit"
                                nameField="takeProfit"
                                placeholder="2"
                                description="This is a threshold, gekko will sell if the profit is over the takeprofit. Unit is percent"
                                formData={this.state.formData}
                                value={this.state.formData.takeProfit}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["takeProfit"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["takeProfit"]}
                            />
                            <Number
                                label="Expiration period"
                                nameField="expirationPeriod"
                                placeholder="24"
                                description="Gekko will hold the trigger. Unit is candle"
                                formData={this.state.formData}
                                value={this.state.formData.expirationPeriod}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["expirationPeriod"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["expirationPeriod"]}
                            />
                            <Number
                                label="Decision threshold"
                                nameField="decisionThreshold"
                                placeholder="0.5"
                                description="Gekko will buy the asset if result of machine learning over the the decition threshold. It &lt; 1 and &gt; 0"
                                formData={this.state.formData}
                                value={this.state.formData.decisionThreshold}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["decisionThreshold"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["decisionThreshold"]}
                            />
                            <Number
                                label="Stop trade limit"
                                nameField="stopTradeLimit"
                                placeholder="-100"
                                description="If gekko make the loss under the stop trade limit, gekko will stop trade. Unit is percent"
                                formData={this.state.formData}
                                value={this.state.formData.stopTradeLimit}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["stopTradeLimit"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["stopTradeLimit"]}
                            />
                            <Option
                                label="Model name"
                                nameField="model_name"
                                description="Name of model"
                                fields={[{ name: "Random Forest", value: "random_forest" }, { name: "Gradient Boosting", value: "gradient_boosting" }]}
                                formData={this.state.formData}
                                value={this.state.formData.model_name}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["model_name"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["model_name"]}
                            />
                            <Option
                                label="Model type"
                                nameField="model_type"
                                description="Type of model"
                                fields={[{ name: "Rolling", value: "rolling" }, { name: "Fixed", value: "fixed" }]}
                                formData={this.state.formData}
                                value={this.state.formData.model_type}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["model_type"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["model_type"]}
                            />
                            <Number
                                label="Lag"
                                nameField="lag"
                                placeholder="23"
                                description="Number of previous candles used for lagging in training model"
                                formData={this.state.formData}
                                value={this.state.formData.lag}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["lag"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["lag"]}
                            />
                            <Json
                                label="Features"
                                nameField="features"
                                placeholder="Feature array"
                                description="Features is an array used for build candle property, member is a string or an object"
                                formData={this.state.formData}
                                value={this.state.formData.features}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["features"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["features"]}
                            />
                            {/* <Option
                                label="Label"
                                nameField="label"
                                description="Label is a property in candle used for classify data"
                                fields={[
                                    { name: "omlbct", value: "omlbct" },
                                    ..._.map(arrFeatures, feature => (
                                        { name: feature.name || feature, value: feature.name || feature })
                                    )
                                ]}
                                formData={this.state.formData}
                                value={this.state.formData.label}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["asset_name"])}
                                errorMessage={errorMessage["asset_name"]}
                            /> */}
                            <DateTime
                                label="Train date range from"
                                nameField="from"
                                placeholder="01/05/2019 00:00:00"
                                description="Data train begin at"
                                formData={this.state.formData}
                                value={this.state.formData.from}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["train_daterange"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["train_daterange"]}
                            />
                            <DateTime
                                label="Train date range to"
                                nameField="to"
                                placeholder="01/06/2019 00:00:00"
                                description="Data train end at"
                                formData={this.state.formData}
                                value={this.state.formData.to}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["train_daterange"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["train_daterange"]}
                            />
                            <Number
                                label="Rolling step"
                                nameField="rolling_step"
                                placeholder="5"
                                description="Rolling step. Unit is candle"
                                formData={this.state.formData}
                                value={this.state.formData.rolling_step}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["rolling_step"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["rolling_step"]}
                            />
                            <Text
                                label="Mail tag"
                                nameField="mailTag"
                                placeholder="[GEKKO]"
                                description="Prefix the email"
                                formData={this.state.formData}
                                value={this.state.formData.mailTag}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["mailTag"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["mailTag"]}
                            />
                            <Number
                                label="Amount for one trade"
                                nameField="amountForOneTrade"
                                placeholder="100"
                                description="Gekko will buy 100 currency if it is 100. Unit is currency"
                                formData={this.state.formData}
                                value={this.state.formData.amountForOneTrade}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["amountForOneTrade"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["amountForOneTrade"]}
                            />
                            <Option
                                label="Mode"
                                nameField="mode"
                                description="Running mode"
                                fields={[
                                    { name: "Paper trading", value: "paper" },
                                    { name: "Live trading", value: "live" },
                                ]}
                                formData={this.state.formData}
                                value={this.state.formData.mode}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["mode"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["mode"]}
                            />
                            {this.state.formData.mode === 'paper' && <Number
                                label="Init asset"
                                nameField="asset"
                                placeholder="0"
                                description="Asset of paper trading. Unit is asset"
                                formData={this.state.formData}
                                value={this.state.formData.asset}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["asset"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["asset"]}
                            />}
                            {this.state.formData.mode === 'paper' && <Number
                                label="Init currency"
                                nameField="currency"
                                placeholder="5000"
                                description="Currency of paper trading. Unit is currency"
                                formData={this.state.formData}
                                value={this.state.formData.currency}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["currency"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["currency"]}
                            />}
                            {this.state.formData.mode === 'live' && <Text
                                label="Key"
                                nameField="key"
                                placeholder="API KEY"
                                description="Key of binance, gekko will use it for trading"
                                formData={this.state.formData}
                                value={this.state.formData.key}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["key"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["key"]}
                            />}
                            {this.state.formData.mode === 'live' && <Text
                                label="Secret"
                                nameField="secret"
                                placeholder="SECRET KEY"
                                description="Secret of binance, gekko will use it for trading"
                                formData={this.state.formData}
                                value={this.state.formData.secret}
                                onChange={this.onChangeDataOfFields}
                                isError={!_.isEmpty(errorMessage["secret"])}
                                isSubmitting={this.state.isSubmitting}
                                errorMessage={errorMessage["secret"]}
                            />}
                            {this.props.isError && this.renderError(this.props.errorMessage)}
                            {this.props.isLoading && this.renderLoading()}
                            {/* </Form> */}
                        </CardBody>
                        <CardFooter>
                            <div style={{ textAlign: "right" }}>
                                <Button type="button" size="sm" color="primary" onClick={this.backtest}>{/*<i className="fa fa-dot-circle-o"></i>*/}Backtest</Button>
                                <Button type="button" size="sm" color="danger" onClick={this.runGekko}>{/*<i className="fa fa-ban"></i>*/}Run</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        )
    }
}
