/* global require */ // Node.js
/* global describe, it, before, beforeEach, after, afterEach */ // Mocha
/* jshint strict: false */

var assert = require("assert"); // Node's regular assert module
require("../lib/Array");

describe("Array", function() {
    it("equals list of integers", function(){
        assert.ok([1,2,3,4,5].equals([1,2,3,4,5]));

        assert.ok(![1,2,3,4,5].equals([1,2,3,4,6]));
        assert.ok(![1,2,3,4,5].equals([5,1,2,3,4]));
    });
});
