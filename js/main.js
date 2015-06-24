var $ = require("jquery"),
    templateEngine = require("lodash/string/template"),
    functions = require("./functions.js");

var $inputData = $(".textarea-inputData"),
    $template = $(".textarea-template"),
    $outputData = $(".textarea-outputData"),

    $rowDelimiter = $(".inputText-rowDelimiter"),
    $columnDelimiter = $(".inputText-columnDelimiter");


[$inputData, $template, $rowDelimiter, $columnDelimiter].map(function ($el) {
    $el.keyup(render);
});


function render() {
    var rowDelimiter = $rowDelimiter.val(),
        columnDelimiter = $columnDelimiter.val(),
        inputData = $inputData.val(),
        templateStr = $template.val();

    if (! $.trim(inputData)) {
        $outputData.val("");
        return;
    }

    if (! $.trim(templateStr)) {
        return;
    }

    try {
        var template = templateEngine(templateStr, {interpolate: /{{([\s\S]+?)}}/g});
    } catch (e) {
        return;
    }

    var rows = functions.splitRows(inputData, rowDelimiter),
        matrix = functions.splitColumns(rows, columnDelimiter),

        outputData = matrix.reduce(function (outputData, row) {
            var newOutputData = "";
            try {
                newOutputData = template(functions.convertRowToTemplateData(row));
            } catch (e) {
            }

            return outputData + newOutputData;
        }, "");

    $outputData.val(outputData);
}
