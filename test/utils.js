// Generated by CoffeeScript 1.8.0
(function() {
    var Utils, should;

    should = require("chai").should();

    Utils = require("../lib/utils");

    describe("utils", function() {
        describe("typeOf", function() {

            it("should correctly identify a string", function() {
                Utils.typeOf("true").should.equal("string");
            });

            it("should correctly identify a boolean", function() {
                Utils.typeOf(true).should.equal("boolean");
            });

            it("should correctly identify a object", function() {
                Utils.typeOf({}).should.equal("object");
            });

            it("should correctly identify a function", function() {
                Utils.typeOf(function() {}).should.equal("function");
            });

            it("should correctly identify a regex", function() {
                Utils.typeOf(/an/).should.equal("regexp");
            });

            it("should correctly identify a number", function() {
                Utils.typeOf(9).should.equal("number");
            });

            it("should correctly identify a date", function() {
                Utils.typeOf(new Date()).should.equal("date");
            });

            it("should identify undefined objects", function() {
                Utils.typeOf().should.equal("undefined");
            });

            it("should identify null objects", function() {
                Utils.typeOf(null).should.equal("null");
            });

        });

        describe("cloneObject", function() {
            it("should return an object with the same properties", function() {
                var clone, original;
                original = {
                    firstKey: "firstValue",
                secondKey: "secondValue"
                };
                clone = Utils.cloneObject(original);
                should.exist(clone);
                clone.should.have.keys(["firstKey", "secondKey"]);
                clone.should.have.property("firstKey", "firstValue");
                clone.should.have.property("secondKey", "secondValue");
            });

            it("should return an object without the except properties", function() {
                var clone, original;
                original = {
                    firstKey: "firstValue",
                secondKey: "secondValue"
                };
                clone = Utils.cloneObject(original, {
                    except: ["secondKey"]
                });
                should.exist(clone);
                clone.should.have.keys(["firstKey"]);
                clone.should.have.property("firstKey", "firstValue");
            });

            it("should do a recursive clone", function() {
                var clone, original;
                original = {
                    firstObject: {
                        secondObject: {
                            thirdObject: "thirdValue"
                        }
                    }
                };
                clone = Utils.cloneObject(original);
                should.exist(clone);
                clone.should.have.keys(["firstObject"]);
                clone.should.have.property("firstObject").should.be.an("object");
                clone.firstObject.should.have.keys(["secondObject"]);
                clone.firstObject.should.have.property("secondObject").should.be.an("object");
                clone.firstObject.secondObject.should.have.keys(["thirdObject"]);
                clone.firstObject.secondObject.should.have.property("thirdObject", "thirdValue");
            });

            it("updating the original should not affect the clone", function() {
                var clone, original;
                original = {
                    firstKey: "firstValue",
                secondKey: "secondValue",
                firstObject: {
                    secondObject: {
                        thirdObject: "thirdValue"
                    }
                }
                };
                clone = Utils.cloneObject(original);
                should.exist(clone);
                clone.should.have.keys(["firstKey", "secondKey", "firstObject"]);
                clone.should.have.property("firstKey", "firstValue");
                clone.should.have.property("secondKey", "secondValue");
                clone.should.have.property("firstObject").should.be.an("object");
                clone.firstObject.should.have.keys(["secondObject"]);
                clone.firstObject.should.have.property("secondObject").should.be.an("object");
                clone.firstObject.secondObject.should.have.keys(["thirdObject"]);
                clone.firstObject.secondObject.should.have.property("thirdObject", "thirdValue");
                original.firstObject.secondObject.thirdObject = "Something else";
                original.secondKey = "Something else entirely";
                clone.should.have.keys(["firstKey", "secondKey", "firstObject"]);
                clone.should.have.property("firstKey", "firstValue");
                clone.should.have.property("secondKey", "secondValue");
                clone.should.have.property("firstObject").should.be.an("object");
                clone.firstObject.should.have.keys(["secondObject"]);
                clone.firstObject.should.have.property("secondObject").should.be.an("object");
                clone.firstObject.secondObject.should.have.keys(["thirdObject"]);
                clone.firstObject.secondObject.should.have.property("thirdObject", "thirdValue");
            });

            it("should deal with circular references", function() {
                var clone, original;
                original = {
                    firstKey: "firstValue"
                };
                original.secondKey = original;
                clone = Utils.cloneObject(original);
                should.exist(clone);
                clone.should.have.keys("firstKey", "secondKey");
                return clone.secondKey.should.be.an("object");
            });
        });

        describe("mergeObjects", function() {
            it("should perform a basic merge", function() {
                var destination, source;
                destination = {
                    firstKey: "firstValue"
                };
                source = {
                    secondKey: "secondValue"
                };
                Utils.mergeObjects(destination, source);
                should.exist(destination);
                destination.should.have.keys(["firstKey", "secondKey"]);
                destination.should.have.property("firstKey", "firstValue");
                destination.should.have.property("secondKey", "secondValue");
            });

            it("should overwrite properties in dest with those in source", function() {
                var destination, source;
                destination = {
                    firstKey: "firstValue",
                secondKey: "no longer present"
                };
                source = {
                    secondKey: "secondValue"
                };
                Utils.mergeObjects(destination, source);
                should.exist(destination);
                destination.should.have.keys(["firstKey", "secondKey"]);
                destination.should.have.property("firstKey", "firstValue");
                destination.should.have.property("secondKey", "secondValue");
            });

            it("should do a recursive merge", function() {
                var destination, source;
                destination = {
                    firstKey: "firstValue",
                firstObject: {
                    secondKey: "secondValue",
                secondObject: {
                    thirdKey: "thirdValue"
                }
                }
                };
                source = {
                    firstKey: "firstValueChanged",
                    firstObject: {
                        secondKey: "secondValueChanged",
                        secondObject: {
                            thirdKey: "thirdValueChanged"
                        }
                    }
                };
                Utils.mergeObjects(destination, source);
                should.exist(destination);
                destination.should.have.keys(["firstKey", "firstObject"]);
                destination.should.have.property("firstKey", "firstValueChanged");
                destination.should.have.property("firstObject").should.be.an("object");
                destination.firstObject.should.have.keys(["secondKey", "secondObject"]);
                destination.firstObject.should.have.property("secondKey", "secondValueChanged");
                destination.firstObject.should.have.property("secondObject").should.be.an("object");
                destination.firstObject.secondObject.should.have.keys(["thirdKey"]);
                destination.firstObject.secondObject.should.have.property("thirdKey", "thirdValueChanged");
            });

            it("should deal with circular references", function() {
                var destination, source;
                destination = {
                    firstKey: "firstValue",
                   thidKey: "thirdValue"
                };
                destination.secondKey = destination;
                source = {
                    firstKey: "firstValueChanged"
                };
                source.secondKey = source;
                Utils.mergeObjects(destination, source);
                should.exist(destination);
                destination.should.have.keys("firstKey", "secondKey", "thidKey");
                destination.secondKey.should.be.an("object");
            });
        });

        describe("filterObject", function() {
            it("should filter base keys", function() {
                var testObject;
                testObject = {
                    firstKey: "firstValue",
                secondKey: "secondValue"
                };
                Utils.filterObject(testObject, ["firstKey"]);
                testObject.should.have.keys(["firstKey", "secondKey"]);
                testObject.should.have.property("firstKey", "[FILTERED]");
                testObject.should.have.property("secondKey", "secondValue");
            });

            it("should filter recursively", function() {
                var testObject;
                testObject = {
                    firstKey: "firstValue",
                firstObject: {
                    secondKey: "secondValue",
                secondObject: {
                    thirdKey: "thirdValue",
                thirdObject: {
                    fouthKey: "fourthValue"
                }
                }
                }
                };
                Utils.filterObject(testObject, ["firstKey", "thirdKey", "thirdObject"]);
                testObject.should.have.keys(["firstKey", "firstObject"]);
                testObject.should.have.property("firstKey", "[FILTERED]");
                testObject.should.have.property("firstObject").should.be.an("object");
                testObject.firstObject.should.have.keys(["secondKey", "secondObject"]);
                testObject.firstObject.should.have.property("secondKey", "secondValue");
                testObject.firstObject.should.have.property("secondObject").should.be.an("object");
                testObject.firstObject.secondObject.should.have.keys(["thirdKey", "thirdObject"]);
                testObject.firstObject.secondObject.should.have.property("thirdKey", "[FILTERED]");
                testObject.firstObject.secondObject.should.have.property("thirdObject", "[FILTERED]");
            });

            it("should deal with circular references", function() {
                var original;
                original = {
                    firstKey: "firstValue",
                thirdKey: "thirdValue"
                };
                original.secondKey = original;
                Utils.filterObject(original);
                should.exist(original);
                original.should.have.keys("firstKey", "secondKey", "thirdKey");
                original.secondKey.should.be.an("object");
            });

            it("should deal with circular references", function() {
                var original;
                original = {
                    firstKey: "firstValue",
                thirdKey: "thirdValue"
                };
                original.secondKey = original;
                Utils.filterObject(original, ["thirdKey"]);
                should.exist(original);
                original.should.have.keys("firstKey", "secondKey", "thirdKey");
                original.secondKey.should.be.an("object");
            });

            it("should deal with objects that don't have hasOwnProperty", function () {
                var data = Object.create(null);

                data.foo = 'bar';
                data.password = '$secret';
                Utils.filterObject(data, ['password']);

                data.foo.should.equal('bar')
                data.password.should.equal('[FILTERED]')
            });
        });
    });

}).call(this);
