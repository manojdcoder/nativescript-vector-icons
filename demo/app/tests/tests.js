var VectorIcons = require("nativescript-vector-icons").VectorIcons;
var vectorIcons = new VectorIcons();

describe("greet function", function() {
    it("exists", function() {
        expect(vectorIcons.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(vectorIcons.greet()).toEqual("Hello, NS");
    });
});