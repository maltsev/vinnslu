exports.splitRows = function (content, separatorStr) {
    var separator = new RegExp(separatorStr, "g");
    return content.split(separator);
};

exports.splitColumns = function (rows, separatorStr) {
    var separator = new RegExp(separatorStr, "g");
    return rows.map(function (row) {
        return row.split(separator);
    });
};

exports.convertRowToTemplateData = function (row) {
    var data = {},
        charCode = 97; // 97 — a

    row.slice(0, 26).map(function (value) {
        data[String.fromCharCode(charCode)] = value;
        charCode++;
    });

    return data;
};


exports.getAvailableVariables = function () {
    return [
        {name: "{{ a }}"},
        {name: "_", template: "<% _. %>"}
    ];
};
