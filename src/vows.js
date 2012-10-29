/*
 * grunt-vows
 * https://github.com/CMTegner/grunt-vows
 *
 * Copyright (c) 2012 Christian Maughan Tegnér
 * Licensed under the MIT license.
 */
"use strict";

var reporters = ["spec", "json", "dot-matrix", "tap", "xunit"];

exports.init  = function (grunt) {
    var configPrefix;

    function configKey(key) {
        return configPrefix.concat(key);
    }

    function setTarget(target) {
        configPrefix = ["vows", target];
    }

    function buildCommand() {
        return [
            "vows",
            getFiles(),
            getReporter(),
            getTestsToRun(),
            getFlag("verbose"),
            getFlag("silent"),
            getFlag("isolate"),
            getColorFlag()
        ].filter(function (entry) {
            return entry !== null;
        }).join(" ");
    }

    function getFiles() {
        var files = grunt.config(configKey("files"));

        if (typeof files === "string") {
            return files;
        } else if (files instanceof Array) {
            return files.join(" ");
        }
        return null;
    }

    function getReporter() {
        var reporter = grunt.config(configKey("reporter")),
            index = reporters.indexOf(reporter);

        if (index === -1) {
            return null;
        }
        return "--" + reporter;
    }

    function getTestsToRun() {
        var onlyRun = grunt.config(configKey("onlyRun"));

        if (typeof onlyRun === "string") {
            return "-m \"" + onlyRun.replace(/"/g, "\\\"") + "\"";
        } else if (onlyRun instanceof RegExp) {
            return "-r \"" + onlyRun.source + "\"";
        }
        return null;
    }

    function getFlag(flag) {
        if (grunt.config(configKey(flag)) === true) {
            return "--" + flag;
        }
        return null;
    }

    function getColorFlag() {
        var value = grunt.config(configKey("colors"));
        if (value === false) {
            return "--no-color";
        }
        return "--color";
    }

    return {
        setTarget: setTarget,
        buildCommand: buildCommand,

        // Exported for testing purposes
        configKey: configKey,
        getFiles: getFiles,
        getReporter: getReporter,
        getTestsToRun: getTestsToRun,
        getFlag: getFlag,
        getColorFlag: getColorFlag
    };

};
