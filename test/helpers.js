"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert"),
    GRUNT = require("grunt"),
    helpers = require("../src/vows").init(GRUNT);

helpers.setTarget("all");
GRUNT.loadTasks(__dirname + "/../tasks");

exports.helpers = VOWS.describe("grunt-vows helpers")
    .addBatch({
        "get files called with a string": {
            topic: function () {
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: "files/*.js"
                        }
                    }
                });
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: ["files/*.js", "spec/*.js", "foo/bar"]
                        }
                    }
                });
                return helpers.getFiles();
            },

            "returns all array entries concatinated together, divided by a single whitespace": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "files/*.js spec/*.js foo/bar");
            }
        },
        "get files called with anything else": {
            topic: function () {
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: 123
                        }
                    }
                });
                return helpers.getFiles();
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        },
        "get files called when no 'files' config is set": {
            topic: function () {
                GRUNT.config.init({
                    vows: {
                        all: {}
                    }
                });
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            reporter: "spec"
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            reporter: "foo"
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            onlyRun: "should \"only\""
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            onlyRun: /test|run/
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            onlyRun: false
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            verbose: true
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            verbose: false
                        }
                    }
                });
                return helpers.getFlag("verbose");
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        },
        "get flag called with a flag not defined in the config": {
            topic: function () {
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            colors: true
                        }
                    }
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
                GRUNT.config.init({
                    vows: {
                        all: {
                            colors: false
                        }
                    }
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
        "config key": {
            topic: function () {
                return helpers.configKey("test");
            },

            "should return an array": function (topic) {
                ASSERT.isArray(topic);
            },

            "should have a length of three": function (topic) {
                ASSERT.strictEqual(topic.length, 3);
            },

            "should have an element at index '0' matching 'vows'": function (topic) {
                ASSERT.strictEqual(topic[0], "vows");
            },

            "should have an element at index '1' matching the target name": function (topic) {
                ASSERT.strictEqual(topic[1], "all");
            },

            "should have an element at index '2' matching the key": function (topic) {
                ASSERT.strictEqual(topic[2], "test");
            }
        }
    })

    .addBatch({
        "build command": {
            topic: function () {
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: "tests",
                            reporter: "tap",
                            onlyRun: "helper",
                            verbose: true,
                            isolate: true,
                            silent: true
                        }
                    }
                });
                return helpers.buildCommand();
            },

            "should return a string": function (topic) {
                ASSERT.isString(topic);
            },

            "should include vows command at the start of the string": function (topic) {
                ASSERT.match(topic, /^vows\s/);
            },

            "should include 'files' option when specified": function (topic) {
                ASSERT.match(topic, /\stests\s/);
            },

            "should include reporter flag when specified": function (topic) {
                ASSERT.match(topic, /\s--tap\s/);
            },

            "should include '-m' option when specified": function (topic) {
                ASSERT.match(topic, /\s-m\s"helper"\s/);
            },

            "should include 'verbose' flag when set": function (topic) {
                ASSERT.match(topic, /\s--verbose\s/);
            },

            "should include 'silent' flag when set": function (topic) {
                ASSERT.match(topic, /\s--silent\s/);
            },

            "should include '--color' flag by default": function (topic) {
                ASSERT.match(topic, /\s--color/);
            },
            "should include 'isolate' flag when specified": function (topic) {
                ASSERT.match(topic, /\s--isolate\s/);
            }
        }
    });
