"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert"),
    GRUNT = require("grunt");

GRUNT.loadTasks(__dirname + "/../tasks");

exports.task = VOWS.describe("grunt-vows")
    .addBatch({
        "when run": {
            topic: function () {
                return true;
            },

            "should run the tests": function (topic) {
                ASSERT.isTrue(topic);
            }
        }
    });
