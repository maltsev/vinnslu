import _template from 'lodash/string/template';
import _trim from 'lodash/string/trim';
import _map from 'lodash/collection/map';
import config from './config';


export function generateOutputData(inputData, template, rowDelimiter, columnDelimiter) {
    const inputDataMatrix = convertInputDataToMatrix(inputData, rowDelimiter, columnDelimiter);
    const templateObj = _template(template, config.templateSettings);

    return inputDataMatrix.reduce(function (outputData, row) {
        try {
            return outputData + templateObj(convertRowToTemplateData(row));
        } catch (e) {
            return outputData;
        }
    }, '');
}


export function getAvailableVariables(inputData, rowDelimiter, columnDelimiter) {
    const inputDataMatrix = convertInputDataToMatrix(inputData, rowDelimiter, columnDelimiter);

    let availableVariables = _map(convertRowToTemplateData(inputDataMatrix[0]), function (value, name) {
        return {
            template: '{{ ' + name + ' }}',
            name: name,
            example: _trim(value)
        };
    });

    // availableVariables.push({
    //     template: '{{ _.random(0, 13) }}',
    //     name: '_',
    //     example: '<a href='https://lodash.com/docs' target='_blank'>lodash</a>'
    // });

    return availableVariables;
}

function convertInputDataToMatrix(inputData, rowDelimiter, columnDelimiter) {
    const rows = splitRows(inputData, rowDelimiter);
    return splitColumns(rows, columnDelimiter);
}


function splitRows(inputData, rowDelimiter) {
    try {
        const delimiter = new RegExp(rowDelimiter, 'g');
        return inputData.split(delimiter);
    } catch (e) {
        return false;
    }
}


function splitColumns(rows, columnDelimiter) {
    try {
        const delimiter = new RegExp(columnDelimiter, 'g');
        return rows.map(function (row) {
            return row.split(delimiter);
        });
    } catch (e) {
        return false;
    }
}


function convertRowToTemplateData(row) {
    let data = {};
    let charCode = 97; // 97 — a

    row.slice(0, 26).map(function (value) {
        data[String.fromCharCode(charCode)] = value;
        charCode++;
    });

    return data;
}
