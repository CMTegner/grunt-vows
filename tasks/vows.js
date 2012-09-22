/*
 * grunt-vows
 * https://github.com/CMTegner/grunt-vows
 *
 * Copyright (c) 2012 Christian Maughan Tegnér
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    "use strict";

    var reporters = ["spec", "json", "dot-matrix"];

    function buildCommand() {
        return [
            "vows",
            grunt.helper("vows-get-files"),
            grunt.helper("vows-get-reporter"),
            grunt.helper("vows-get-tests-to-run"),
            grunt.helper("vows-get-flag", "verbose"),
            grunt.helper("vows-get-flag", "silent"),
            grunt.helper("vows-get-color-flag")
        ].filter(function (entry) {
            return entry !== null;
        }).join(" ");
    }

    grunt.registerTask("vows", "Run vows tests.", function () {
        var done = this.async(),
            vows = require("child_process").exec(buildCommand());

        vows.stdout.pipe(process.stdout);
        vows.stderr.on("data", function (data) {
            grunt.log.error(data);
        });
        vows.on("exit", function (code) {
            done(code);
        });
    });

    grunt.registerHelper("vows-get-files", function () {
        var files = grunt.config("vows.files");

        if (typeof files === "string") {
            return files;
        } else if (files instanceof Array) {
            return files.join(" ");
        }
        return null;
    });

    grunt.registerHelper("vows-get-reporter", function () {
        var reporter = grunt.config("vows.reporter"),
            index = reporters.indexOf(reporter);

        if (index === -1) {
            return null;
        }
        return "--" + reporter;
    });

    grunt.registerHelper("vows-get-tests-to-run", function () {
        var onlyRun = grunt.config("vows.onlyRun");

        if (typeof onlyRun === "string") {
            return "-m \"" + onlyRun.replace(/"/g, "\\\"") + "\"";
        } else if (onlyRun instanceof RegExp) {
            return "-r \"" + onlyRun.source + "\"";
        }
        return null;
    });

    grunt.registerHelper("vows-get-flag", function (flag) {
        if (grunt.config("vows." + flag) === true) {
            return "--" + flag;
        }
        return null;
    });

    grunt.registerHelper("vows-get-color-flag", function () {
        var value = grunt.config("vows.colors");
        if (value === false) {
            return "--no-color";
        }
        return "--color";
    });
};

