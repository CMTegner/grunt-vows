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
                jshintrc: true
            }
        },
        vows: {
            options: {
                reporter: "spec"
            },
            helpers: {
                src: ["test/helpers.js"]
            },
            task: ["test/task.js"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadTasks("tasks");

    grunt.registerTask("default", defaultTasks);

};

