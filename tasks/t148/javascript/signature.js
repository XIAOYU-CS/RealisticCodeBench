/**
 * Removes elements from an array based on specified criteria.
 *
 * @param {Array} array - The array to remove elements from
 * @param {*} element - The element to be removed
 * @param {Object} [options={}] - Configuration options
 * @param {string} [options.mode='first'] - Removal mode: 'first', 'all', or 'limit'
 * @param {number} [options.limit=1] - Number of elements to remove when mode is 'limit'
 * @param {boolean} [options.useStrict=true] - Whether to use strict equality (===) or loose equality (==)
 * @returns {Array} A new array with specified elements removed
 * @throws {TypeError} If the first argument is not an array
 * @throws {Error} If mode is not one of 'first', 'all', or 'limit'
 * @throws {Error} If limit is not a positive integer when mode is 'limit'
 */
function removeElements(array, element, options = {}) {}