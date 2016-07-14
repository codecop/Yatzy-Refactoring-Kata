/**
 * Equals on arrays containing primitives.
 * @see http://stackoverflow.com/a/14853974/104143
 */
Array.prototype.equals = function (array) {
    "use strict";
    // TODO revisit comments, remove or make code clear

    // if the other array is a falsy value, return
    if (!array) {
        return false;
    }

    // compare lengths - can save a lot of time
    if (this.length !== array.length) {
        return false;
    }

    var i;
    for (i = 0; i < this.length; i += 1) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i])) {
                return false;
            }
        } else if (this[i] !== array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }

    return true;
};
