import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import Textarea from './Textarea';
import { changeInputData, changeTemplate } from '../actions';


export default class App extends Component {
    render() {
        const { dispatch, inputData, template, outputData } = this.props;

        return (
            <div className="container">
                <Sidebar {...this.props} />
                <div className="mainColumn">
                    <Textarea name="inputData" placeholder="Input data" tabindex={1}
                              value={inputData.value} isValid={inputData.isValid}
                              onChange={content => dispatch(changeInputData(content))} />
                    <Textarea name="template" placeholder="Template" tabindex={2}
                              value={template.value} isValid={template.isValid}
                              onChange={content => dispatch(changeTemplate(content))} />
                    <Textarea name="outputData" placeholder="Output data" tabindex={6}
                              value={outputData.value} onChange={() => ''} />
                </div>
            </div>
        );
    }
}

App.propTypes = {
    inputData: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired
    }).isRequired,

    template: PropTypes.shape({
        value: PropTypes.string.isRequired,
        isValid: PropTypes.bool.isRequired
    }).isRequired,

    outputData: PropTypes.shape({
        value: PropTypes.string.isRequired
    }).isRequired,

    availableVariables: PropTypes.array.isRequired
};


function select(state) {
    return state;
}


export default connect(select)(App);
