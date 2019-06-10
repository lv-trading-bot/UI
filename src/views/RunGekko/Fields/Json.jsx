import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormGroup, Col, Label, FormText} from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/kuroir';

export default class Json extends Component {
    static propTypes = {
        label: PropTypes.string,
        nameField: PropTypes.string,
        placeholder: PropTypes.string,
        description: PropTypes.string,
        dataForm: PropTypes.object,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        isError: PropTypes.bool,
        isSubmitting: PropTypes.bool,
        errorMessage: PropTypes.string
    }
    
    state = {}

    onChange = (val) => {
        this.props.onChange(this.props.nameField, val);
    }

    render() {
        let isTouchOrSudmit = this.state.isTouch || this.props.isSubmitting;
        return (
            <FormGroup row>
                <Col md="3">
                    <Label htmlFor={this.props.id}>{this.props.label}</Label>
                </Col>
                <Col xs="12" md="9">
                    <AceEditor
                        placeholder={this.props.placeholder}
                        mode="json"
                        theme="kuroir"
                        name={"this.props.id"}
                        onLoad={() => { }}
                        onChange={this.onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={this.props.value}
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            // enableBasicAutocompletion: true,
                            // enableLiveAutocompletion: true,
                            // enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2
                        }}
                        defaultValue={`["open", "high", "low", "close"]`}
                        onBlur={() => this.setState({ isTouch: true })}
                    />
                    <FormText color="muted">{this.props.description}</FormText>
                    {isTouchOrSudmit && this.props.isError && <FormText color="danger">{this.props.errorMessage || "This field is require"}</FormText>}
                </Col>
            </FormGroup>
        )
    }
}
