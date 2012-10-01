"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert"),
    GRUNT = require("grunt");

GRUNT.loadTasks(__dirname + "/../tasks");
GRUNT.file.setBase(__dirname);

exports.task = VOWS.describe("grunt-vows")
    .addBatch({
        "when run with no matching tests": {
            topic: function () {
                var callback = this.callback,
                    called;
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: "test/*.js",
                            onlyRun: "none",
                            silent: true
                        }
                    }
                });
                GRUNT.task.options({
                    done: function () {
                        if (!called) {
                            called = true;
                            callback(true);
                        }
                    },
                    error: function () {
                        if (!called) {
                            called = true;
                            callback(false);
                        }
                    }
                });
                GRUNT.task.run("vows").start();
            },

            "should succeed": function (result) {
                ASSERT.isTrue(result);
            }
        }
    })

    .addBatch({
        "when run with tests that pass": {
            topic: function () {
                var callback = this.callback,
                    called;
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: "test/*.js",
                            onlyRun: "pass",
                            silent: true
                        }
                    }
                });
                GRUNT.task.options({
                    done: function () {
                        if (!called) {
                            called = true;
                            callback(true);
                        }
                    },
                    error: function () {
                        if (!called) {
                            called = true;
                            callback(false);
                        }
                    }
                });
                GRUNT.task.run("vows").start();
            },

            "should succeed": function (result) {
                ASSERT.isTrue(result);
            }
        }
    })

    .addBatch({
        "when run with tests that fail": {
            topic: function () {
                var callback = this.callback,
                    called;
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: "test/*.js",
                            onlyRun: "fail",
                            silent: true
                        }
                    }
                });
                GRUNT.task.options({
                    done: function () {
                        if (!called) {
                            called = true;
                            callback(true);
                        }
                    },
                    error: function () {
                        if (!called) {
                            called = true;
                            callback(false);
                        }
                    }
                });
                GRUNT.task.run("vows").start();
            },

            "should fail": function (result) {
                ASSERT.isFalse(result);
            }
        }
    })

    .addBatch({
        "when run with tests that err": {
            topic: function () {
                var callback = this.callback,
                    called;
                GRUNT.config.init({
                    vows: {
                        all: {
                            files: "test/*.js",
                            onlyRun: "err",
                            silent: true
                        }
                    }
                });
                GRUNT.task.options({
                    done: function () {
                        if (!called) {
                            called = true;
                            callback(true);
                        }
                    },
                    error: function () {
                        if (!called) {
                            called = true;
                            callback(false);
                        }
                    }
                });
                GRUNT.task.run("vows").start();
            },

            "should fail": function (result) {
                ASSERT.isFalse(result);
            }
        }
    });
