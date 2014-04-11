"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert"),
    GRUNT = require("grunt"),
    helpers = require("../src/vows")();

GRUNT.loadTasks(__dirname + "/../tasks");

exports.helpers = VOWS.describe("grunt-vows helpers")
    .addBatch({
        "get files called with a string": {
            topic: function () {
                helpers.setFiles([{ src: "files/*.js" }]);
                return helpers.getFiles();
            },

            "returns the same argument": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "files/*.js");
            }
        },
        "get files called with an array": {
            topic: function () {
                helpers.setFiles([{
                    src: "files/*.js"
                }, {
                    src: "spec/*.js"
                }, {
                    src: "foo/bar"
                }]);
                return helpers.getFiles();
            },

            "returns all array entries concatinated together, divided by a single whitespace": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "files/*.js spec/*.js foo/bar");
            }
        },
        "get files called when no 'files' config is set": {
            topic: function () {
                helpers.setFiles(undefined);
                return helpers.getFiles();
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        }
    })

    .addBatch({
        "get reporter called with a valid reporter value": {
            topic: function () {
                helpers.setOptions({
                    reporter: "spec"
                });
                return helpers.getReporter();
            },

            "returns a double-hyphen prefixed string": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "--spec");
            }
        },
        "get reporter called with an invalid reporter": {
            topic: function () {
                helpers.setOptions({
                    reporter: "foo"
                });
                return helpers.getReporter();
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        }
    })

    .addBatch({
        "get tests to run called with a string": {
            topic: function () {
                helpers.setOptions({
                    onlyRun: "should \"only\""
                });
                return helpers.getTestsToRun();
            },

            "returns the string matching option": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "-m \"should \\\"only\\\"\"");
            }
        },
        "get tests to run called with a regular expression": {
            topic: function () {
                helpers.setOptions({
                    onlyRun: /test|run/
                });
                return helpers.getTestsToRun();
            },

            "returns the RegExp matching option": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "-r \"test|run\"");
            }
        },
        "get tests to run called with anything else": {
            topic: function () {
                helpers.setOptions({
                    onlyRun: false
                });
                return helpers.getTestsToRun();
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        }
    })

    .addBatch({
        "get flag called with a flag set to true in the config": {
            topic: function () {
                helpers.setOptions({
                    verbose: true
                });
                return helpers.getFlag("verbose");
            },

            "returns a double-hyphen prefixed flag string": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "--verbose");
            }
        },
        "get flag called with a flag set to false in the config": {
            topic: function () {
                helpers.setOptions({
                    verbose: false
                });
                return helpers.getFlag("verbose");
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        },
        "get flag called with a flag not defined in the config": {
            topic: function () {
                helpers.setOptions({});
                return helpers.getFlag("silent");
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        }
    })

    .addBatch({
        "get color flag called with no 'colors' flag set in config": {
            topic: function () {
                helpers.setOptions({});
                return helpers.getColorFlag();
            },

            "returns '--color'": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "--color");
            }
        },
        "get color flag called with the 'colors' flag set to true": {
            topic: function () {
                helpers.setOptions({
                    colors: true
                });
                return helpers.getColorFlag();
            },

            "returns '--color'": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "--color");
            }
        },
        "get color flag called with the 'colors' flag set to false": {
            topic: function () {
                helpers.setOptions({
                    colors: false
                });
                return helpers.getColorFlag();
            },

            "returns '--no-color'": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "--no-color");
            }
        }
    })

    .addBatch({
        "get coverage format with an invalid coverage reporter specified": {
            topic: function () {
                helpers.setOptions({
                    coverage: "flart"
                });
                return helpers.getCoverageFormat();
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        },
        "get coverage format with no coverage format specified": {
            topic: function () {
                helpers.setOptions({
                    all: {}
                });
                return helpers.getCoverageFormat();
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        },
        "get coverage format with a valid coverage reporter specified": {
            topic: function () {
                helpers.setOptions({
                    coverage: "json"
                });
                return helpers.getCoverageFormat();
            },

            "returns a string": function (topic) {
                ASSERT.isString(topic);
            },

            "returns a coverage flag": function (topic) {
                ASSERT.strictEqual(topic, "--cover-json");
            }
        }
    })

    .addBatch({
        "build command": {
            topic: function () {
                helpers.setFiles([{ src: "tests" }]);
                helpers.setOptions({
                    reporter: "tap",
                    onlyRun: "helper",
                    verbose: true,
                    isolate: true,
                    silent: true,
                    coverage: "xml"
                });
                return helpers.buildCommand();
            },

            "should return a string": function (topic) {
                ASSERT.isString(topic);
            },

            "should include node and the vows executable at the start of the string": function (topic) {
                ASSERT.match(topic, /^node node_modules\/vows\/bin\/vows(\s|$)/);
            },

            "should include 'files' option when specified": function (topic) {
                ASSERT.match(topic, /\stests(\s|$)/);
            },

            "should include reporter flag when specified": function (topic) {
                ASSERT.match(topic, /\s--tap(\s|$)/);
            },

            "should include '-m' option when specified": function (topic) {
                ASSERT.match(topic, /\s-m\s"helper"(\s|$)/);
            },

            "should include 'verbose' flag when set": function (topic) {
                ASSERT.match(topic, /\s--verbose(\s|$)/);
            },

            "should include 'silent' flag when set": function (topic) {
                ASSERT.match(topic, /\s--silent(\s|$)/);
            },

            "should include '--color' flag by default": function (topic) {
                ASSERT.match(topic, /\s--color(\s|$)/);
            },

            "should include 'isolate' flag when specified": function (topic) {
                ASSERT.match(topic, /\s--isolate(\s|$)/);
            },

            "should include 'coverage' flag when specified": function (topic) {
                ASSERT.match(topic, /\s--cover-xml(\s|$)/);
            }
        }
    });
