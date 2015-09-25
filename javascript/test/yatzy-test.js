/* global require */ // Node.js
/* global describe, it, before, beforeEach, after, afterEach */ // Mocha
/* jshint strict: false */

var assert = require("assert");
var Yatzy = require("../lib/yatzy").yatzy;
var Dices = require("../lib/yatzy").dices;

describe("Dices", function() {
    it("dices with", function() {
        var dices = new Dices(1, 2, 3, 4, 5);
        var actual = dices.diceWithX(1);
        assert.equal(typeof actual.sum, 'function');
    });
});

describe("Chance", function() {
    it("scores sum of all dice", function(){
        assert.equal(15, new Yatzy(2, 3, 4, 5, 1).chance());
        assert.equal(16, new Yatzy(3, 3, 4, 5, 1).chance());
    });
});

describe("Yatzy", function() {
    it("scores 50", function() {
        assert.equal(50, new Yatzy(4,4,4,4,4).yatzy());
        assert.equal(50, new Yatzy(6,6,6,6,6).yatzy());
    });

    it("scores 0 otherwise", function() {
        assert.equal(0, new Yatzy(6,6,6,6,3).yatzy());
    });
});

describe("Ones", function() {
    it("score the sum of 1s", function() {
        assert.equal(1, new Yatzy(1,2,3,4,5).ones());
        assert.equal(2, new Yatzy(1,2,1,4,5).ones());
        assert.equal(4, new Yatzy(1,2,1,1,1).ones());
    });

    it("scores 0 otherwise", function() {
        assert.equal(0, new Yatzy(6,2,2,4,5).ones());
    });
});

describe("Twos", function() {
    it("score the sum of 2s", function() {
        assert.equal(4, new Yatzy(1,2,3,2,6).twos());
        assert.equal(10, new Yatzy(2,2,2,2,2).twos());
    });
});

describe("Threes", function() {
    it("score the sum of 3s", function() {
        assert.equal(6, new Yatzy(1,2,3,2,3).threes());
        assert.equal(12, new Yatzy(2,3,3,3,3).threes());
    });
});

describe("Fours", function() {
    it("score the sum of 4s", function() {
        assert.equal(12, new Yatzy(4,4,4,5,5).fours());
        assert.equal(8, new Yatzy(4,4,5,5,5).fours());
        assert.equal(4, new Yatzy(4,5,5,5,5).fours());
    });
});

describe("Fives", function() {
    it("score the sum of fives", function() {
        assert.equal(10, new Yatzy(4,4,4,5,5).fives());
        assert.equal(15, new Yatzy(4,4,5,5,5).fives());
        assert.equal(20, new Yatzy(4,5,5,5,5).fives());
    });
});

describe("Sixes", function() {
    it("score the sum of sixes", function() {
        assert.equal(6, new Yatzy(4,4,6,5,5).sixes());
        assert.equal(18, new Yatzy(6,5,6,6,5).sixes());
    });

    it("scores 0 otherwise", function() {
        assert.equal(0, new Yatzy(4,4,4,5,5).sixes());
    });
});

describe("One pair", function() {
    it("scores the sum of the highest pair", function() {
        assert.equal(6, new Yatzy(3,4,3,5,6).onePair());
        assert.equal(10, new Yatzy(5,3,3,3,5).onePair());
        assert.equal(12, new Yatzy(5,3,6,6,5).onePair());
        assert.equal(12, new Yatzy(3,3,6,6,5).onePair());
        assert.equal(12, new Yatzy(6,6,1,3,3).onePair());
    });
});

describe("Two pair", function() {
    it("scores the sum of the two pairs", function() {
        assert.equal(16, new Yatzy(3,3,5,4,5).twoPair());
        assert.equal(16, new Yatzy(3,3,5,5,5).twoPair());
    });
});

describe("Three of a kind", function() {
    it("scores the sum of the three of the kind", function() {
        assert.equal(9, new Yatzy(3,3,3,4,5).threeOfAKind());
        assert.equal(15, new Yatzy(5,3,5,4,5).threeOfAKind());
        assert.equal(9, new Yatzy(3,3,3,3,5).threeOfAKind());
    });
});

describe("Four of a kind", function() {
    it("scores the sum of the four of the kind", function() {
        assert.equal(12, new Yatzy(3,3,3,3,5).fourOfAKind());
        assert.equal(20, new Yatzy(5,5,5,4,5).fourOfAKind());
        assert.equal(12, new Yatzy(3,3,3,3,3).fourOfAKind());
    });
});

describe("Small straight", function() {
    it("scores 15", function() {
        assert.equal(15, new Yatzy(1,2,3,4,5).smallStraight());
        assert.equal(15, new Yatzy(2,3,4,5,1).smallStraight());
    });

    it("scores 0 otherwise", function() {
        assert.equal(0, new Yatzy(1,2,2,4,5).smallStraight());
        assert.equal(0, new Yatzy(2,3,4,5,6).smallStraight());
    });
});

describe("Large straight", function() {
    it("scores 20", function() {
        assert.equal(20, new Yatzy(6,2,3,4,5).largeStraight());
        assert.equal(20, new Yatzy(2,3,4,5,6).largeStraight());
    });

    it("scores 0 otherwise", function() {
        assert.equal(0, new Yatzy(1,2,2,4,5).largeStraight());
        assert.equal(0, new Yatzy(1,2,3,4,5).largeStraight());
    });
});

describe("Full house", function() {
    it("scores the sum of the full house", function() {
        assert.equal(18, new Yatzy(6,2,2,2,6).fullHouse());
        assert.equal(22, new Yatzy(6,2,2,6,6).fullHouse());
        assert.equal(15, new Yatzy(1,1,1,6,6).fullHouse());
    });

    it("scores 0 otherwise", function() {
        assert.equal(0, new Yatzy(2,3,4,5,6).fullHouse());
        assert.equal(0, new Yatzy(1,1,2,2,3).fullHouse());
        assert.equal(0, new Yatzy(1,1,1,2,3).fullHouse());
        assert.equal(0, new Yatzy(1,1,1,1,2).fullHouse());
        assert.equal(0, new Yatzy(1,1,1,1,1).fullHouse());
    });
});
