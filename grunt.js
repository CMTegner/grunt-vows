module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        lint: {
            all: [
                "grunt.js",
                "src/**/*.js",
                "task/**/*.js",
                "test/**/*.js"
            ]
        },
        watch: {
            all: {
                files: "<config:lint.all>",
                tasks: "lint vows"
            }
        },
        jshint: {
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

    grunt.loadTasks("tasks");

    grunt.registerTask("default", "lint vows");

};

