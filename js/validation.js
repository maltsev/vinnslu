import _template from 'lodash/string/template';
import config from './config';

export function rowDelimiter(delimiterStr) {
    return regexp(delimiterStr);
}


export function columnDelimiter(delimiterStr) {
    return regexp(delimiterStr);
}


export function template(templateStr) {
    try {
        return !! _template(templateStr, config.templateSettings);
    } catch (e) {
        return false;
    }
}


export function inputData() {
    return true;
}


function regexp(regexpStr) {
    try {
        return !! new RegExp(regexpStr, 'g');
    } catch (e) {
        return false;
    }
}
