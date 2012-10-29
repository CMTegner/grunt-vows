module.exports = function (grunt) {
    "use strict";

    var defaultTasks = ["jshint", "vows"],
        jsFiles = [
            "Gruntfile.js",
            "src/**/*.js",
            "task/**/*.js",
            "test/**/*.js"
        ];

    grunt.initConfig({
        watch: {
            all: {
                files: jsFiles,
                tasks: defaultTasks
            }
        },
        jshint: {
            all: jsFiles,
            options: {
                // Enforcing options
                forin: false,
                indent: 4,
                plusplus: false,
                quotmark: "double",
                regexp: false,
                // Relaxing options
                globalstrict: true,
                // Environments
                node: true
            }
        },
        vows: {
            helpers: {
                files: "test/helpers.js",
                reporter: "spec"
            },
            task: {
                files: "test/task.js",
                reporter: "spec"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadTasks("tasks");

    grunt.registerTask("default", defaultTasks);

};

