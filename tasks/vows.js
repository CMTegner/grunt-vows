/*
 * grunt-vows
 * https://github.com/CMTegner/grunt-vows
 *
 * Copyright (c) 2012 Christian Maughan Tegnér
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    "use strict";

    function buildCommand() {
        var cmd = ["vows"],
            files = grunt.config("vows.files");
        if (files) {
            cmd.push(files);
        }
        if (grunt.config("vows.spec")) {
            cmd.push("--spec");
        }
        return cmd.join(" ");
    }

    grunt.registerTask("vows", "Run vows tests.", function () {
        var done = this.async(),
            vows = require("child_process").exec(buildCommand());

        vows.stdout.on("data", function (data) {
            grunt.log.writeln(data);
        });

        vows.stderr.on("data", function (data) {
            grunt.log.writeln(data);
        });

        vows.on("exit", function (code) {
            done(code);
        });
    });
};

