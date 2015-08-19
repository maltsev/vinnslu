import React, { findDOMNode, Component } from 'react';

export default class Examples extends Component {
    render() {
        const activeExampleId = this.props.examples.reduce(function (activeExampleId, example) {
            return example.isActive ? example.id : activeExampleId;
        }, 0);

        return (
            <div className="inputGroup inputGroup-examples">
                <label className="inputGroup_label" htmlFor="examplesList">Examples:</label>
                <select className="examples" value={activeExampleId} tabIndex="5" id="examplesList" ref="select" onChange={e => this.handleChange(e)}>
                    {this.props.examples.map((example) =>
                        <option className="examples_item" key={example.id} value={example.id}>{example.name}</option>
                    )}
                </select>
            </div>
        );
    }

    handleChange(e) {
        const node = findDOMNode(this.refs.select);
        const newExampleId = parseInt(node.value, 10) || 0;
        this.props.onChange(newExampleId);
    }
}
