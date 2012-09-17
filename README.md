grunt-vows
==========
A grunt task for running your vows tests.

Installation
============
```
› npm install grunt-vows
```

Usage
=====
Either run it via grunt by first adding this line to your project's `grunt.js` gruntfile:
```
grunt.loadNpmTasks("grunt-vows");
```
then by running the `vows` task directly (or via an alias):
```
› grunt vows
```
or you can run it as a stand-alone command:
```
› grunt-vows
```
(requires global installation, i.e. `npm install -g grunt-vows`)

Caveats
=======
* Will only test files matching `test/*.js` (#3)
* Hardcoded to report in 'spec' style (#1)

License
=======
Copyright (c) 2012 Christian Maughan Tegnér  
Licensed under the MIT license.

