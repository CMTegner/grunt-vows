grunt-vows [![Build Status](https://secure.travis-ci.org/CMTegner/grunt-vows.png)](http://travis-ci.org/CMTegner/grunt-vows)
==========
A grunt task for running your vows tests.

Installation
------------
    › npm install grunt-vows

Usage
-----
Either run it via grunt by first adding this line to your project's `grunt.js` gruntfile:

    grunt.loadNpmTasks("grunt-vows");

then by running the `vows` task directly (or via an alias):

    › grunt vows

or you can run it as a stand-alone command:

    › grunt-vows

(requires global installation, i.e. `npm install -g grunt-vows`)

Configuration
-------------
*Note: As of version 0.2.0 grunt-vows is a multi-task!*

Configuration is handled via the default grunt multi-task config schema:

    grunt.initConfig({
        vows: {
            all: {
                // String or array of strings
                // determining which files to include
                files: ["test/*.js", "spec/*"],
                // String {spec|json|dot-matrix|xunit|tap}
                // defaults to "dot-matrix"
                reporter: "spec",
                // String or RegExp which is
                // matched against title to
                // restrict which tests to run
                onlyRun: /helper/,
                // Boolean, defaults to false
                verbose: false,
                // Boolean, defaults to false
                silent: false,
                // Colorize reporter output,
                // boolean, defaults to true
                colors: true
            }
        }
    });

License
-------
Copyright (c) 2012 Christian Maughan Tegnér
Licensed under the MIT license.
