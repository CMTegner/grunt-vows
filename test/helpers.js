"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert"),
    GRUNT = require("grunt"),
    configPrefix = ["vows", "all"];

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
                return GRUNT.helper("vows-get-files", configPrefix);
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
                return GRUNT.helper("vows-get-files", configPrefix);
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
                return GRUNT.helper("vows-get-files", configPrefix);
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
                return GRUNT.helper("vows-get-files", configPrefix);
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
                return GRUNT.helper("vows-get-reporter", configPrefix);
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
                return GRUNT.helper("vows-get-reporter", configPrefix);
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
                return GRUNT.helper("vows-get-tests-to-run", configPrefix);
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
                return GRUNT.helper("vows-get-tests-to-run", configPrefix);
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
                return GRUNT.helper("vows-get-tests-to-run", configPrefix);
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
                return GRUNT.helper("vows-get-flag", "verbose", configPrefix);
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
                return GRUNT.helper("vows-get-flag", "verbose", configPrefix);
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        },
        "get flag called with a flag not defined in the config": {
            topic: function () {
                return GRUNT.helper("vows-get-flag", "silent", configPrefix);
            },

            "returns null": function (topic) {
                ASSERT.isNull(topic);
            }
        }
    })

    .addBatch({
        "get color flag called with no 'colors' flag set in config": {
            topic: function () {
                return GRUNT.helper("vows-get-color-flag", configPrefix);
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
                return GRUNT.helper("vows-get-color-flag", configPrefix);
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
                return GRUNT.helper("vows-get-color-flag", configPrefix);
            },

            "returns '--no-color'": function (topic) {
                ASSERT.isNotNull(topic);
                ASSERT.isString(topic);
                ASSERT.strictEqual(topic, "--no-color");
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
                            silent: true
                        }
                    }
                });
                return GRUNT.helper("vows-build-command", configPrefix);
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
            }
        }
    });
