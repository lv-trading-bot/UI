import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Col, Label, Input, FormText} from 'reactstrap';

export default class DateTime extends Component {
    static propTypes = {
        label: PropTypes.string,
        nameField: PropTypes.string,
        placeholder: PropTypes.string,
        description: PropTypes.string,
        dataForm: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        onChange: PropTypes.func.isRequired,
        isError: PropTypes.bool,
        isSubmitting: PropTypes.bool,
        errorMessage: PropTypes.string
    }

    state = {}

    render() {
        let isTouchOrSudmit = this.state.isTouch || this.props.isSubmitting;
        return (
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor={this.props.id}>{this.props.label}</Label>
                </Col>
                <Col xs="12" md="9">
                    <Input 
                        type="datetime-local" 
                        id={this.props.nameField} 
                        name={this.props.nameField} 
                        placeholder={this.props.placeholder}
                        value={this.props.value || ""}
                        onChange={(e) => this.props.onChange(this.props.nameField, e.target.value)}
                        invalid={this.props.isError && this.state.isTouch}
                        valid={!this.props.isError && this.state.isTouch}
                        onBlur={() => this.setState({ isTouch: true })}
                    />
                    <FormText color="muted">{this.props.description}</FormText>
                    {isTouchOrSudmit && this.props.isError && <FormText color="danger">{this.props.errorMessage || "This field is require"}</FormText>}
                </Col>
            </FormGroup>
        )
    }
}
