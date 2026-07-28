/**
 * Replace values in someArr based on the nearest non-masked values in rms (or custom mask condition).
 *
 * @param {number[][]} someArr - A 2D array whose values will be replaced where maskFunc(rms) is true
 * @param {number[][]} rms - A 2D array of the same shape as someArr
 * @param {Function} maskFunc - A function that takes a value from rms and returns a boolean
 * @returns {number[][]} A copy of someArr with values replaced based on nearest non-masked neighbors
 */
function replaceByNearest(someArr, rms, maskFunc = (x) => x === 0) {}