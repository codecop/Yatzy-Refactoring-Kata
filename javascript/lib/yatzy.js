/* global module, require */ // Node.JS
require("./Array");

var Dices = function(dice) {
	"use strict";

	// TODO check if all methods need to be public

	this.diceWith = function(eyes) {
		var filteredEyes = dice.filter(function(eyeOfDice) {
			return eyeOfDice === eyes;
		});
        return new Dices(filteredEyes);
	};

	this.allDiceSameLike = function(eyes) {
	    // TODO maybe remove this function?
        function diceWithX(eyes) {
            return dice.filter(function(eyeOfDice) {
                return eyeOfDice === eyes;
            });
        }

		return diceWithX(eyes).length === dice.length;
	};

	this.firstDice = function() {
        return dice[0];
	};

    this.countsByEye = function() {
		return dice.reduce(function(counter, eyesOfDice) {
			counter[eyesOfDice] = (counter[eyesOfDice] || 0) + 1;
			return counter;
		}, {});
    };

    // TODO eyesWithCountOfAtLeast() returns Dices and max is function of Dices
	this.eyesWithCountOfAtLeast = function(limit) {
	    return this.eyesWithCountOf(function(count) {
	        return count >= limit;
	    });
	};

	this.eyesWithCountOfAtLeastX = function(limit) {
	    var eyes = this.eyesWithCountOf(function(count) {
	        return count >= limit;
	    });
	    return new Dices(eyes);
	};

    // TODO maybe rename eyesWithNumberOfOccurrencesFor - count is not clear
	this.eyesWithCountOf = function(filterCount) {
		var countsByEyes = this.countsByEye();

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
	};

	this.eyesWithCountOfExactly = function(limit) {
	    return this.eyesWithCountOf(function(count) {
	        return count === limit;
	    });
	};

	this.sum = function() {
		return dice.reduce(function(sum, current) {
			return sum + current;
		}, 0);
	};

    this.max = function() {
        return Math.max.apply(null, dice);
    };

};

var Yatzy = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
	"use strict";

    function argumentsToArray(obj) {
        var array = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                array.push(obj[key]);
            }
        }
        return array;
    }

    var dice = new Dices(argumentsToArray(arguments));
    // with internal max, sum, first, this separates rules from array logic

	// TODO sort functions by public/private, private down - after dices has been pulled out

    this.ones = function() {
		return dice.diceWith(1).sum();
    };

    this.twos = function() {
		return dice.diceWith(2).sum();
    };

    this.threes = function() {
		return dice.diceWith(3).sum();
    };

    this.fours = function() {
		return dice.diceWith(4).sum();
    };

    this.fives = function() {
		return dice.diceWith(5).sum();
    };

    this.sixes = function() {
		return dice.diceWith(6).sum();
    };

    this.chance = function() {
		return dice.sum();
	};

    this.yatzy = function() {
		if (dice.allDiceSameLike(dice.firstDice())) {
			return 50;
		}
		return 0;
	};

    function max(list) {
        return Math.max.apply(null, list);
    }

	this.onePair = function() {
		return dice.eyesWithCountOfAtLeastX(2).max() * 2;
	};

	this.fourOfAKind = function() {
		return dice.eyesWithCountOfAtLeastX(4).max() * 4;
	};

	this.threeOfAKind = function() {
		return dice.eyesWithCountOfAtLeastX(3).max() * 3;
	};

	this.twoPair = function() {

        function sum(list) {
            return list.reduce(function(sum, current) {
                return sum + current;
            }, 0);
        }

	    var eyesOfExistingPairs = dice.eyesWithCountOfAtLeast(2);
	    if (eyesOfExistingPairs.length === 2) {
	         return sum(eyesOfExistingPairs) * 2;
	    }
	    return 0;
     };

    this.smallStraight = function() {
        var eyes = dice.eyesWithCountOfExactly(1);
        // TODO (maybe) move equals to Dices, do not pollute array, implement easier for special case [int]
        if ([1,2,3,4,5].equals(eyes)) {
            return dice.sum();
        }
        return 0;
    };

    this.largeStraight = function() {
        var eyes = dice.eyesWithCountOfExactly(1);
        if ([2,3,4,5,6].equals(eyes)) {
            return dice.sum();
        }
        return 0;
    };

    this.fullHouse = function() {
        var pairs = dice.eyesWithCountOfExactly(2);
        var threes = dice.eyesWithCountOfExactly(3);
        if (pairs.length === 1 && threes.length === 1) {
            return dice.sum();
        }
        return 0;
    };
};

// TODO think if we want to expose Dices as public? if yes move to its own file, if not remove from here
module.exports = {yatzy: Yatzy, dices: Dices};
