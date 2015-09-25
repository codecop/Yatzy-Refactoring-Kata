/* global module, require */ // Node.JS
require("./Array");

var Dices = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
	"use strict";

    var dice = [eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5];

	this.diceWith = function(eyes) {
		return dice.filter(function(eyeOfDice) {
			return eyeOfDice === eyes;
		});
	}

	this.firstDice = function() {
        return dice[0];
	}

}


var Yatzy = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
	"use strict";

    var dice = [eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5];
    var xxx = new Dices(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5);
    // TODO maybe have own type/class "Dices" for this array
    // with internal max, sum, first, this separates rules from array logic

	// TODO sort functions by public/private, private down - after dices has been pulled out

	function sum(list) {
		return list.reduce(function(sum, current) {
			return sum + current;
		}, 0);
	}

    this.ones = function()
    {
		return sum(xxx.diceWith(1));
    };

    this.twos = function()
    {
		return sum(xxx.diceWith(2));
    };

    this.threes = function()
    {
		return sum(xxx.diceWith(3));
    };

    this.fours = function()
    {
		return sum(xxx.diceWith(4));
    };

    this.fives = function()
    {
		return sum(xxx.diceWith(5));
    };

    this.sixes = function()
    {
		return sum(xxx.diceWith(6));
    };

    this.chance = function() {
		return sum(dice);
	};

	function allDiceSameLike(eyes) {
		return xxx.diceWith(eyes).length === dice.length;
	}

    this.yatzy = function() {
		if (allDiceSameLike(xxx.firstDice())) {
			return 50;
		}
		return 0;
	};

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

    // TODO maybe rename eyesWithNumberOfOccurrencesFor - count is not clear
	function eyesWithCountOf(filterCount) {
		var countsByEyes = countsByEye();

        var eyes = [ ];
		for(var eyeStr in countsByEyes) {
		    if(countsByEyes.hasOwnProperty(eyeStr)) {
                var count = countsByEyes[eyeStr];
                if (filterCount(count)) {
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
            return sum(dice);
        }
        return 0;
    };

    this.largeStraight = function() {
        var eyes = eyesWithCountOfExactly(1);
        if ([2,3,4,5,6].equals(eyes)) {
            return sum(dice);
        }
        return 0;
    };

    this.fullHouse = function() {
        var pairs = eyesWithCountOfExactly(2);
        var threes = eyesWithCountOfExactly(3);
        if (pairs.length === 1 && threes.length === 1) {
            return sum(dice);
        }
        return 0;
    };
};

module.exports = Yatzy;
