module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        lint: {
            all: ["*.js", "test/*.js"]
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
                quotemark: "double",
                regexp: false,
                maxstatements: 1,
                // Relaxing options
                globalstrict: true,
                // Environments
                node: true
            }
        },
        vows: {
            reporter: "spec"
        }
    });

    grunt.loadTasks("tasks");

    grunt.registerTask("default", "lint vows");

};

