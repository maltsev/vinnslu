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


var $availableVariables = $(".availableVariables");

$availableVariables.on("click", ".availableVariables_button", function () {
    var newTemplate = $template.val() + $(this).val();
    $template.val(newTemplate);
    render();
});



function renderAvailableVariables() {
    var inputData = getInputData();
    if (! inputData.length) {
        return;
    }

    var availableVariables = _.map(functions.convertRowToTemplateData(inputData[0]), function (value, name) {
        return {
            template: "{{ " + name + " }}",
            name: name,
            example: _.trim(value)
        };
    });

    availableVariables.push({
        template: "{{ _.random(0, 13) }}",
        name: "_",
        example: '<a href="https://lodash.com/docs" target="_blank">lodash</a>'
    });

    var html = _.reduce(availableVariables, function (html, variable) {
        return html + '<li class="availableVariables_listItem">' +
                        '<button class="availableVariables_button" value="' + variable.template + '">' + variable.name + '</button>' +
                        '<span class="availableVariables_example">' + variable.example + '</span>' +
                      '</li>';
    }, "");

    $(".availableVariables_list", $availableVariables).html(html);
}


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
    renderAvailableVariables();

    var templateStr = $template.val();
    if (! _.trim(templateStr)) {
        return;
    }

    var inputData = getInputData();
    if (! inputData.length) {
        $outputData.val("");
        return;
    }

    try {
        var template = _.template(templateStr, {interpolate: /{{([\s\S]+?)}}/g});
        $template.removeClass("textarea-error");
    } catch (e) {
        $template.addClass("textarea-error");
        return;
    }

    var outputData = inputData.reduce(function (outputData, row) {
            var newOutputData = "";
            try {
                newOutputData = template(functions.convertRowToTemplateData(row));
            } catch (e) {}

            return outputData + newOutputData;
        }, "");

    $outputData.val(outputData);
}


function getInputData() {
    var rowDelimiter = $rowDelimiter.val(),
        columnDelimiter = $columnDelimiter.val(),
        inputDataRaw = $inputData.val(),
        invalidObjects = [],
        validObjects = [];

    try {
        new RegExp(rowDelimiter, "g");
    } catch (e) {
        invalidObjects.push($rowDelimiter);
    }

    try {
        new RegExp(columnDelimiter, "g");
    } catch (e) {
        invalidObjects.push($columnDelimiter);
    }

    $(".inputText-delimiter").removeClass("inputText-error").closest(".inputTextWrapper").removeClass("inputTextWrapper-error");
    if (invalidObjects.length) {
        invalidObjects.map(function ($obj) {
            $obj.addClass("inputText-error").closest(".inputTextWrapper").addClass("inputTextWrapper-error");
        });

        return [];
    }


    if (! _.trim(inputDataRaw)) {
        return [];
    }

    var rows = functions.splitRows(inputDataRaw, rowDelimiter);
    return functions.splitColumns(rows, columnDelimiter)
}
