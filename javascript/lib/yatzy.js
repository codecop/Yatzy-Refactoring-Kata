/* global module, require */ // Node.JS
require("./Array");

var Yatzy = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
	"use strict";
	// TODO call only constructor, not functions directly, i.e. all methods are instance methods
	// TODO naming of methods with _ and CamelCase => CamelCase is wished
	// TODO general cleanup, ...
	// TODO sort functions by public/private, private down

    var dice = [eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5];
    // TODO maybe have own type/class for this array with internal max, sum, first, this separates rules from array logic
    // wait for all functions finished

	function sum(list) {
		return list.reduce(function(sum, current) {
			return sum + current;
		}, 0);
	}

	function diceWith(eyes) {
		return dice.filter(function(eyeOfDice) {
			return eyeOfDice === eyes;
		});
	}

    this.ones = function()
    {
		return sum(diceWith(1));
    };

    this.twos = function()
    {
		return sum(diceWith(2));
    };

    this.threes = function()
    {
		return sum(diceWith(3));
    };

    this.fours = function()
    {
		return sum(diceWith(4));
    };

    this.fives = function()
    {
		return sum(diceWith(5));
    };

    this.sixes = function()
    {
		return sum(diceWith(6));
    };

    this.chance = function() {
        // TODO dice is far away for just closure?
		return sum(dice);
	};

	function allDiceSameLike(eyes) {
		return diceWith(eyes).length === dice.length;
	}

    this.yatzy = function() {
		if (allDiceSameLike(firstDice())) {
			return 50;
		}
		return 0;
	};

	function firstDice() {
        return dice[0];
	}

    function countsByEye() {
		return dice.reduce(function(counter, eyesOfDice) {
			counter[eyesOfDice] = (counter[eyesOfDice] || 0) + 1;
			return counter;
		}, {});
    }

	function eyesWithCountOfAtLeast(limit) {
	    return eyesWithCountOf(function(count) {
	        return count >= limit;
	    });
	}

    // TODO rename eyesWithNumberOfOccurancesFor
	function eyesWithCountOf(filterCount) {
		var countsByEyes = countsByEye();

        var eyes = [ ];
		for(var eyeStr in countsByEyes) {
		    if(countsByEyes.hasOwnProperty(eyeStr)) {
                // TODO maybe use foreach key/value, see http://bjorn.tipling.com/maps-sets-and-iterators-in-javascript
                var count = countsByEyes[eyeStr];
                if (filterCount(count)) {
                    // TODO try use strict and see if it works without cast
                    var eye = parseInt(eyeStr, 10);
                    eyes.push(eye);
                }
		    }
		}
		return eyes;
	}

    function max(list) {
        return Math.max.apply(null, list);
    }

	this.onePair = function() {
		return max(eyesWithCountOfAtLeast(2)) * 2;
	};

	this.fourOfAKind = function() {
		return max(eyesWithCountOfAtLeast(4)) * 4;
	};

	this.threeOfAKind = function() {
		return max(eyesWithCountOfAtLeast(3)) * 3;
	};

	this.twoPair = function() {
	    var eyesOfExistingPairs = eyesWithCountOfAtLeast(2);
	    if (eyesOfExistingPairs.length === 2) {
	         return sum(eyesOfExistingPairs) * 2;
	    }
	    return 0;
     };

	function eyesWithCountOfExactly(limit) {
	    return eyesWithCountOf(function(count) {
	        return count === limit;
	    });
	}

    this.smallStraight = function() {
        var eyes = eyesWithCountOfExactly(1);
        if ([1,2,3,4,5].equals(eyes)) {
            return sum(eyes);
        }
        return 0;
    };

    this.largeStraight = function() {
        var eyes = eyesWithCountOfExactly(1);
        if ([2,3,4,5,6].equals(eyes)) {
            return sum(eyes);
        }
        return 0;
    };

    this.fullHouse = function() {
        var eyes2 = eyesWithCountOfExactly(2);
        var eyes3 = eyesWithCountOfExactly(3);
        if (eyes2.length == 1 && eyes3.length == 1) {
            return eyes2[0] * 2 + eyes3[0] * 3;
        }
        return 0;
    };
};

module.exports = Yatzy;
