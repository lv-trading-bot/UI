import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Col, Label, Input, FormText } from 'reactstrap';
import _ from 'lodash';

export default class Number extends Component {
    static propTypes = {
        label: PropTypes.string,
        nameField: PropTypes.string,
        description: PropTypes.string,
        fields: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired, 
            value: PropTypes.string.isRequired
        })),
        dataForm: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func.isRequired,
        isError: PropTypes.bool,
        errorMessage: PropTypes.string
    }

    state = {}

    onChange = (e) => {
        if(e.target.value === "-1293892367647723") {
            this.props.onChange(this.props.nameField, null)
        } else {
            this.props.onChange(this.props.nameField, e.target.value)
        }
    }

    render() {
        return (
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor={this.props.id}>{this.props.label}</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input 
                        type="select" 
                        name={this.props.nameField} 
                        id={this.props.nameField}
                        onChange={this.onChange}
                        invalid={this.props.isError && this.state.isTouch}
                        valid={!this.props.isError && this.state.isTouch}
                        onBlur={() => this.setState({ isTouch: true })}
                    >
                        {_.map([{name: "{Empty}", value: "-1293892367647723"}, ...this.props.fields], (field, index) => (
                            <option 
                                value={field.value} 
                                checked={field.value === this.props.value}
                                key={field.value || index}
                            >
                                {field.name}
                            </option>
                        ))}
                    </Input>
                    <FormText color="muted">{this.props.description}</FormText>
                    {this.state.isTouch && this.props.isError && <FormText color="danger">{this.props.errorMessage || "This field is require"}</FormText>}
                </Col>
            </FormGroup>
        )
    }
}
