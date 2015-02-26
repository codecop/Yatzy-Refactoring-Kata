var Yatzy = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
	// TODO call only cunstructor, not functions directly
	// TODO naming of methods with _ and CamelCase => CamelCase is wished

    var dice = [eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5];

	function sum(list) {
		return list.reduce(function(sum, current) {
			return sum + current;
		}, 0);
	}

	function diceWith(eyes) {
		return dice.filter(function(eyeOfDice) {
			return eyeOfDice == eyes;
		});
	}

    this.fours = function()
    {
		return sum(diceWith(4));
    }

    this.fives = function()
    {
		return sum(diceWith(5));
    }

    this.sixes = function()
    {
		return sum(diceWith(6));
    }

    this.chance = function() {
		return sum(dice);
	}

	function isAllDiceWith(eyes) {
		return diceWith(eyes).length == dice.length;
	}

    this.yatzy = function() {
		if (isAllDiceWith(dice[0])) {
			return 50;
		}
		return 0;
	}

	function eyesWithCountOfAtLeast(limit) {
		var countsByEyes = dice.reduce(function(counter, current) {
			counter[current] = (counter[current] || 0) + 1;
			return counter;
		}, {});

        eyes = [];
		for(var eye in countsByEyes) {
			if (countsByEyes[eye] >= limit) {
			    eyes.push(eye);
			}
		}
		return eyes;
	}

    function max(list) {
        return Math.max.apply(null, list);
    }

	this.onePair = function() {
		return max(eyesWithCountOfAtLeast(2)) * 2;
	}

}

 // TODO make member function + remove duplication
Yatzy.ones = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
    var sum = 0;
    if (eyesOfDice1 == 1) sum++;
    if (eyesOfDice2 == 1) sum++;
    if (eyesOfDice3 == 1) sum++;
    if (eyesOfDice4 == 1) sum++;
    if (eyesOfDice5 == 1)
        sum++;

    return sum;
}

Yatzy.twos = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
    var sum = 0;
    if (eyesOfDice1 == 2) sum += 2;
    if (eyesOfDice2 == 2) sum += 2;
    if (eyesOfDice3 == 2) sum += 2;
    if (eyesOfDice4 == 2) sum += 2;
    if (eyesOfDice5 == 2) sum += 2;
    return sum;
}

Yatzy.threes = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5) {
    var s;
    s = 0;
    if (eyesOfDice1 == 3) s += 3;
    if (eyesOfDice2 == 3) s += 3;
    if (eyesOfDice3 == 3) s += 3;
    if (eyesOfDice4 == 3) s += 3;
    if (eyesOfDice5 == 3) s += 3;
    return s;
}

Yatzy.two_pair = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5)
{
    var counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    counts[eyesOfDice1-1]++;
    counts[eyesOfDice2-1]++
    counts[eyesOfDice3-1]++
    counts[eyesOfDice4-1]++;
    counts[eyesOfDice5-1]++;
    var n = 0;
    var score = 0;
    for (i = 0; i < 6; i += 1)
        if (counts[6-i-1] >= 2) {
            n++;
            score += (6-i);
        }
    if (n == 2)
        return score * 2;
    else
        return 0;
}

// TODO Renaming
Yatzy.four_of_a_kind = function(_1, _2, eyesOfDice3, eyesOfDice4, eyesOfDice5)
{
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0, 0]
    tallies[_1-1]++;
    tallies[_2-1]++;
    tallies[eyesOfDice3-1]++;
    tallies[eyesOfDice4-1]++;
    tallies[eyesOfDice5-1]++;
    for (i = 0; i < 6; i++)
        if (tallies[i] >= 4)
            return (i+1) * 4;
    return 0;
}

Yatzy.three_of_a_kind = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5)
{
    var t;
    t = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    t[eyesOfDice1-1]++;
    t[eyesOfDice2-1]++;
    t[eyesOfDice3-1]++;
    t[eyesOfDice4-1]++;
    t[eyesOfDice5-1]++;
    for (i = 0; i < 6; i++)
        if (t[i] >= 3)
            return (i+1) * 3;
    return 0;
}

Yatzy.smallStraight = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5)
{
    var tallies;
    tallies = [0, 0, 0, 0, 0, 0, 0]
    tallies[eyesOfDice1-1] += 1;
    tallies[eyesOfDice2-1] += 1;
    tallies[eyesOfDice3-1] += 1;
    tallies[eyesOfDice4-1] += 1;
    tallies[eyesOfDice5-1] += 1;
    if (tallies[0] == 1 &&
        tallies[1] == 1 &&
        tallies[2] == 1 &&
        tallies[3] == 1 &&
        tallies[4] == 1)
        return 15;
    return 0;
}

Yatzy.largeStraight = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5)
{
    var tallies;
    tallies = [0, 0, 0, 0,0,0,0,0];
    tallies[eyesOfDice1-1] += 1;
    tallies[eyesOfDice2-1] += 1;
    tallies[eyesOfDice3-1] += 1;
    tallies[eyesOfDice4-1] += 1;
    tallies[eyesOfDice5-1] += 1;
    if (tallies[1] == 1 &&
        tallies[2] == 1 &&
        tallies[3] == 1 &&
        tallies[4] == 1
        && tallies[5] == 1)
        return 20;
    return 0;
}

Yatzy.fullHouse = function(eyesOfDice1, eyesOfDice2, eyesOfDice3, eyesOfDice4, eyesOfDice5)
{
    var tallies;
    var  _2 = false;
    var i;
    var _2_at = 0;
    var _3 = false;
    var _3_at = 0;




    tallies = [0, 0, 0, 0, 0, 0, 0, 0];
    tallies[eyesOfDice1-1] += 1;
    tallies[eyesOfDice2-1] += 1;
    tallies[eyesOfDice3-1] += 1;
    tallies[eyesOfDice4-1] += 1;
    tallies[eyesOfDice5-1] += 1;

    for (i = 0; i != 6; i += 1)
        if (tallies[i] == 2) {
            _2 = true;
            _2_at = i+1;
        }

    for (i = 0; i != 6; i += 1)
        if (tallies[i] == 3) {
            _3 = true;
            _3_at = i+1;
        }

    if (_2 && _3)
        return _2_at * 2 + _3_at * 3;
    else
        return 0;
}

module.exports = Yatzy;


