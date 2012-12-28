grunt-vows [![Build Status](https://secure.travis-ci.org/CMTegner/grunt-vows.png)](http://travis-ci.org/CMTegner/grunt-vows)
==========
A grunt task for running your vows test specs.

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
                colors: true,
                // Run each test in its own
                // vows process, defaults to
                // false
                isolate: false,
                // String {plain|html|json|xml}
                // defaults to none
                coverage: "json"
            }
        }
    });


Release History
---------------
* 2012-10-29   v0.2.1   Updated to be Grunt 0.4 compatible. Added support for "isolate" option.
* 2012-10-01   v0.2.0   Made "grunt-vows" a multi-task.
* 2012-09-29   v0.1.3   Added support for two undocumented reporters. Fixed a bug which could prevent the task from correctly reporting test failures.
* 2012-09-22   v0.1.2   Added "reporter", "onlyRun", "verbose", "silent", and "no-color" configuration options.
* 2012-09-20   v0.1.1   Added "files" configuration option for specifying which files to look for specs in.
* 2012-09-16   v0.1.0   Initial release.

License
-------
Copyright (c) 2012-2013 Christian Maughan Tegnér
Licensed under the MIT license.
