/**
 * Replace values in someArr based on the nearest non-masked values in rms (or custom mask condition).
 *
 * @param {Array<Array<number>>} someArr - A 2D array whose values will be replaced where maskFunc(rms) is true
 * @param {Array<Array<number>>} rms - A 2D array of the same shape as someArr. Nearest non-masked neighbors
 *                                     (where maskFunc(rms) is false) determine the replacement indices for someArr
 * @param {Function} maskFunc - A function that takes a value from rms and returns a boolean.
 *                            Positions where the result is true will be replaced. Defaults to (x) => x === 0
 * @returns {Array<Array<number>>} A copy of someArr with values replaced based on nearest non-masked neighbors
 * @throws {Error} If arrays have different shapes, are not 2D, or maskFunc returns non-boolean values
 */
function replaceByNearest(someArr, rms, maskFunc = (x) => x === 0) {}