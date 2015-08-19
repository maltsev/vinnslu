import React, { findDOMNode, Component, PropTypes } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';

export default class InputGroup extends Component {
    render() {
        let inputId = this.props.name + 'Input';
        let isValid = this.props.isValid === false ? false : true;
        let inputTextWrapperClasses = classNames('inputTextWrapper', {'inputTextWrapper-error': ! isValid});
        let inputClasses = classNames('inputText', 'inputText-delimiter',
                                      'inputText-' + this.props.name, {'inputText-error': ! isValid});

        return (
            <div className="inputGroup">
                <label className="inputGroup_label" htmlFor={inputId}>{this.props.label}:</label>
                <span className={inputTextWrapperClasses}>/<input type="text" className={inputClasses} id={inputId} tabIndex={this.props.tabindex} name={this.props.name} value={this.props.value} ref="input" onChange={e => this.handleChange(e)} />/g</span>
            </div>
        );
    }

    handleChange(e) {
        const node = findDOMNode(this.refs.input);
        this.props.onChange(node.value);
    }
}


InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tabindex: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isValid: PropTypes.bool
};
