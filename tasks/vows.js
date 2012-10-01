/*
 * grunt-vows
 * https://github.com/CMTegner/grunt-vows
 *
 * Copyright (c) 2012 Christian Maughan Tegnér
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    "use strict";

    var reporters = ["spec", "json", "dot-matrix", "tap", "xunit"];

    /**
     * Convenience method for writing data to streams.
     * This method ensures that data that only contains line feeds is not written.
     * Note that this method is meant to be used with Function#bind() where `this` is bound to the stream to write to.
     *
     * @param {String} data the data to write
     */
    function writer(data) {
        if (!/^(\r\n|\n|\r)$/gm.test(data)) {
            this.write(data);
        }
    }

    grunt.registerMultiTask("vows", "Run vows tests.", function () {
        var done = this.async(),
            vows = require("child_process").exec(grunt.helper("vows-build-command", ["vows", this.target]));

        vows.stdout.on("data", writer.bind(process.stdout));
        vows.stderr.on("data", writer.bind(process.stderr));
        vows.on("exit", function (code) {
            done(code === 0);
        });
    });

    grunt.registerHelper("vows-build-command", function (configPrefix) {
        return [
            "vows",
            grunt.helper("vows-get-files", configPrefix),
            grunt.helper("vows-get-reporter", configPrefix),
            grunt.helper("vows-get-tests-to-run", configPrefix),
            grunt.helper("vows-get-flag", "verbose", configPrefix),
            grunt.helper("vows-get-flag", "silent", configPrefix),
            grunt.helper("vows-get-color-flag", configPrefix)
        ].filter(function (entry) {
            return entry !== null;
        }).join(" ");
    });

    grunt.registerHelper("vows-get-files", function (configPrefix) {
        var files = grunt.config(configPrefix.concat(["files"]));

        if (typeof files === "string") {
            return files;
        } else if (files instanceof Array) {
            return files.join(" ");
        }
        return null;
    });

    grunt.registerHelper("vows-get-reporter", function (configPrefix) {
        var reporter = grunt.config(configPrefix.concat("reporter")),
            index = reporters.indexOf(reporter);

        if (index === -1) {
            return null;
        }
        return "--" + reporter;
    });

    grunt.registerHelper("vows-get-tests-to-run", function (configPrefix) {
        var onlyRun = grunt.config(configPrefix.concat("onlyRun"));

        if (typeof onlyRun === "string") {
            return "-m \"" + onlyRun.replace(/"/g, "\\\"") + "\"";
        } else if (onlyRun instanceof RegExp) {
            return "-r \"" + onlyRun.source + "\"";
        }
        return null;
    });

    grunt.registerHelper("vows-get-flag", function (flag, configPrefix) {
        if (grunt.config(configPrefix.concat(flag)) === true) {
            return "--" + flag;
        }
        return null;
    });

    grunt.registerHelper("vows-get-color-flag", function (configPrefix) {
        var value = grunt.config(configPrefix.concat("colors"));
        if (value === false) {
            return "--no-color";
        }
        return "--color";
    });
};
