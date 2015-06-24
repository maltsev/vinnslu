var functions = require("./../js/functions.js");

describe("Functions:", function () {
    it("splitRows splits content by \\n", function () {
        expect(functions.splitRows("foo\nbar\nbaz", "\n")).toEqual(["foo", "bar", "baz"]);
    });

    it("splitColumns splits rows by ;", function () {
        expect(functions.splitColumns(["1;2", "3;4", "5;6"], ";")).toEqual([["1", "2"], ["3", "4"], ["5", "6"]]);
    });

    it("converts row to template data", function () {
        expect(functions.convertRowToTemplateData(["foo", "baz", "bar"])).toEqual({a: "foo", b: "baz", c: "bar"});
    });
});
