/*
 * grunt-vows
 * https://github.com/CMTegner/grunt-vows
 *
 * Copyright (c) 2012 Christian Maughan Tegnér
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    "use strict";

    grunt.registerTask("vows", "Run vows tests.", function() {
        var done = this.async(),
            args = this.args, // TODO: Needed?
            vows = require("child_process").spawn("vows", ["--spec"]);

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

