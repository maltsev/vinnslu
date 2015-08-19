export const CHANGE_ROW_DELIMITER = 'CHANGE_ROW_DELIMITER';
export const CHANGE_COLUMN_DELIMITER = 'CHANGE_COLUMN_DELIMITER';
export const CHANGE_INPUT_DATA = 'CHANGE_INPUT_DATA';
export const CHANGE_TEMPLATE = 'CHANGE_TEMPLATE';
export const APPEND_TEMPLATE = 'APPEND_TEMPLATE';
export const CHANGE_EXAMPLE = 'CHANGE_EXAMPLE';


export function changeRowDelimiter(delimiter) {
    return {type: CHANGE_ROW_DELIMITER, delimiter};
}

export function changeColumnDelimiter(delimiter) {
    return {type: CHANGE_COLUMN_DELIMITER, delimiter};
}

export function changeInputData(inputData) {
    return {type: CHANGE_INPUT_DATA, inputData};
}

export function changeTemplate(template) {
    return {type: CHANGE_TEMPLATE, template};
}

export function appendTemplate(template, beforeNewLine = true) {
    return {type: APPEND_TEMPLATE, template, beforeNewLine};
}

export function changeExample(exampleId) {
    return {type: CHANGE_EXAMPLE, exampleId};
}
