var $ = require("jquery"),
    _ = require("lodash"),
    functions = require("./functions.js");

var $inputData = $(".textarea-inputData"),
    $template = $(".textarea-template"),
    $outputData = $(".textarea-outputData"),

    $rowDelimiter = $(".inputText-rowDelimiter"),
    $columnDelimiter = $(".inputText-columnDelimiter");


[$inputData, $template, $rowDelimiter, $columnDelimiter].map(function ($el) {
    $el.keyup(render);
});


var examplesData = require("./examples"),
    $examples = $(".examples");

var examplesHtml = _.reduce(examplesData, function (examplesHtml, data, id) {
    return examplesHtml + '<option class="examples_item" value="' + id + '">' + data.name + '</option>';
}, "");

$examples.html(examplesHtml);

$examples.change(function () {
    var exampleId = $(this).val();
    renderExample(exampleId);
});

renderExample(0);

function renderExample(exampleId) {
    var data = examplesData[exampleId];
    if (! data) {
        return;
    }

    $rowDelimiter.val(data.rowDelimiter || "\n");
    $columnDelimiter.val(data.columnDelimiter || ";");
    $inputData.val(data.inputData || "");
    $template.val(data.template || "");

    render();
}


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
        var template = _.template(templateStr, {interpolate: /{{([\s\S]+?)}}/g});
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
