"use strict";

var VOWS = require("vows"),
    ASSERT = require("assert");

exports.suit = VOWS.describe("dummy test suit")
    .addBatch({
        "passing test": {
            topic: function () {
                return true;
            },

            "is passing": function (topic) {
                ASSERT.isTrue(topic);
            }
        }
    })

    .addBatch({
        "failing test": {
            topic: function () {
                return false;
            },

            "is failing": function (topic) {
                ASSERT.isTrue(topic);
            }
        }
    })

    .addBatch({
        "err'ing test": {
            topic: function () {
                return true;
            },

            "is err'ing": function () {
                throw "OH LAWDY LAWD!"
            }
        }
    });
