import u from 'updeep';
import { CHANGE_ROW_DELIMITER, CHANGE_COLUMN_DELIMITER, CHANGE_INPUT_DATA, CHANGE_TEMPLATE, APPEND_TEMPLATE, CHANGE_EXAMPLE } from './actions';
import examplesData from './examples';
import { generateOutputData, getAvailableVariables } from './functions';
import * as validate from './validation';

const initialExample = examplesData[0];

const initialState = outputData(availableVariables({
    rowDelimiter: {
        value: initialExample.rowDelimiter,
        isValid: true
    },
    columnDelimiter: {
        value: initialExample.columnDelimiter,
        isValid: true
    },
    inputData: {
        value: initialExample.inputData,
        isValid: true
    },
    template: {
        value: initialExample.template,
        isValid: true
    },
    outputData: {value: ''}, // outputData will be generated in outputData()
    availableVariables: [], // availableVariables will be generated in availableVariables()
    examples: examplesData.map(function (exampleData, i) {
        return u({id: i, isActive: i === 0}, exampleData);
    })
}));


function rowDelimiter(state, action) {
    const newRowDelimiter = action.delimiter;
    state = u({rowDelimiter: {value: newRowDelimiter, isValid: validate.rowDelimiter(newRowDelimiter)}}, state);
    return outputData(availableVariables(state));
}


function columnDelimiter(state, action) {
    const newColumnDelimiter = action.delimiter;
    state = u({columnDelimiter: {value: newColumnDelimiter, isValid: validate.columnDelimiter(newColumnDelimiter)}}, state);
    return outputData(availableVariables(state));
}


function inputData(state, action) {
    const newInputData = action.inputData;
    state = u({inputData: {value: newInputData, isValid: validate.inputData(newInputData)}}, state);
    return outputData(availableVariables(state));
}


function template(state, action) {
    let newTemplate;
    if (action.type === APPEND_TEMPLATE) {
        const currentTemplate = state.template.value;
        // newTemplate can be inserted before newline character (if it exists) or after it
        if (action.beforeNewLine && currentTemplate.search('\n') !== -1) {
            newTemplate = currentTemplate.replace('\n', action.template + '\n');
        } else {
            newTemplate = currentTemplate + action.template;
        }
    } else {
        newTemplate = action.template;
    }

    state = u({template: {value: newTemplate, isValid: validate.template(newTemplate)}}, state);
    return outputData(state);
}


function example(state, action) {
    const activeExample = state.examples[action.exampleId];
    if (activeExample === undefined) {
        return state;
    }

    state = u({rowDelimiter: {value: activeExample.rowDelimiter},
               columnDelimiter: {value: activeExample.columnDelimiter},
               inputData: {value: activeExample.inputData},
               template: {value: activeExample.template},
               examples: state.examples.map(function (exampleData) {
                   return u({isActive: exampleData.id === activeExample.id}, exampleData);
               })},

               state);

    return outputData(availableVariables(state));
}


function availableVariables(state) {
    if (! state.rowDelimiter.isValid || ! state.columnDelimiter.isValid || ! state.inputData.isValid) {
        return state;
    }

    const availableVariablesArray = getAvailableVariables(state.inputData.value, state.rowDelimiter.value,
                                                          state.columnDelimiter.value);
    return u({availableVariables: availableVariablesArray}, state);
}


function outputData(state) {
    if (! state.rowDelimiter.isValid || ! state.columnDelimiter.isValid ||
        ! state.inputData.isValid || ! state.template.isValid) {
        return state;
    }

    const newOutputData = generateOutputData(state.inputData.value, state.template.value,
                                             state.rowDelimiter.value, state.columnDelimiter.value);
    return u({outputData: {value: newOutputData}}, state);
}



export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_ROW_DELIMITER:
            return rowDelimiter(state, action);

        case CHANGE_COLUMN_DELIMITER:
            return columnDelimiter(state, action);

        case CHANGE_INPUT_DATA:
            return inputData(state, action);

        case CHANGE_TEMPLATE:
        case APPEND_TEMPLATE:
            return template(state, action);

        case CHANGE_EXAMPLE:
            return example(state, action);

        default:
            return state;
    }
}
