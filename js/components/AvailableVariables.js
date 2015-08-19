import React, { Component, PropTypes } from 'react';

export default class AvailableVariables extends Component {
    render() {
        return (
            <div className="availableVariables">
                Available variables:
                <ul className="availableVariables_list">
                    {this.props.availableVariables.map((availableVariable, i) =>
                        <li key={i} className="availableVariables_listItem">
                            <button className="availableVariables_button" onClick={e => this.handleClick(availableVariable.template)} value={availableVariable.template}>{availableVariable.name}</button>
                            <span className="availableVariables_example" dangerouslySetInnerHTML={{__html: availableVariable.example}}></span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }

    handleClick(availableVariableTemplate) {
        this.props.onClick(availableVariableTemplate);
    }
}
