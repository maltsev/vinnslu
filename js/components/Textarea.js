import React, { findDOMNode, Component, PropTypes } from 'react';
import classNames from 'classnames';
import Sidebar from './Sidebar';


export default class Textarea extends Component {
    render() {
        let isValid = this.props.isValid === false ? false : true;
        let classes = classNames('textarea', 'textarea-' + this.props.name, {'textarea-error': ! isValid});

        return (
            <textarea className={classes} tabIndex={this.props.tabindex} placeholder={this.props.placeholder} name={this.props.name} onChange={e => this.handleChange(e)} ref="textarea" value={this.props.value}></textarea>
        );
    }

    handleChange(e) {
        const node = findDOMNode(this.refs.textarea);
        this.props.onChange(node.value);
    }
}


Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    tabindex: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    isValid: PropTypes.bool
};
