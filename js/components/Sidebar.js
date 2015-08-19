import React, { Component, PropTypes } from 'react';
import Examples from './Examples';
import AvailableVariables from './AvailableVariables';
import InputGroup from './InputGroup';
import { changeRowDelimiter, changeColumnDelimiter, changeExample, appendTemplate } from '../actions';


export default class Sidebar extends Component {
    render() {
        const { dispatch } = this.props;

        return (
            <div className="sidebar">
                <div className="logo">
                    <h1 className="logo_text">Vinnslu</h1>
                    <p className="logo_caption">Simple tabular-like data parser</p>
                </div>

                <InputGroup name="rowDelimiter" tabindex={3} label="Row delimiter"
                            value={this.props.rowDelimiter.value} isValid={this.props.rowDelimiter.isValid}
                            onChange={delimiter => dispatch(changeRowDelimiter(delimiter))} />
                <InputGroup name="columnDelimiter" tabindex={4} label="Column delimiter"
                            value={this.props.columnDelimiter.value} isValid={this.props.columnDelimiter.isValid}
                            onChange={delimiter => dispatch(changeColumnDelimiter(delimiter))} />

                <Examples examples={this.props.examples} onChange={exampleId => dispatch(changeExample(exampleId))} />
                <AvailableVariables availableVariables={this.props.availableVariables}
                                    onClick={template => dispatch(appendTemplate(template))} />

                <div className="author">
                    <a href="https://github.com/maltsev" className="link author_name">Kirill Maltsev</a>
                </div>
            </div>
        );
    }
}


Sidebar.propTypes = {
    rowDelimiter: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired
    }).isRequired,

    columnDelimiter: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired
    }).isRequired,

    examples: React.PropTypes.arrayOf(PropTypes.shape({
        id: React.PropTypes.number,
        name: PropTypes.string.isRequired
    })).isRequired,

    availableVariables: React.PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        template: PropTypes.string.isRequired,
        example: PropTypes.string.isRequired
    })).isRequired
};
