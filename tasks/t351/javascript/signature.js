/**
 * Parses a string representing a list of ranks or rank ranges into an array of numbers.
 *
 * The input string can contain:
 * - Single integers: "1, 2, 3"
 * - Ranges separated by double hyphen "--" or single hyphen "-": "1--5", "10-5"
 * - Mixed format: "1, 3--7, 10"
 *
 * A step value controls the increment/decrement within ranges.
 * Only integers (or values convertible to integers) are supported.
 *
 * @param {string} rankRange - The string containing ranks and/or ranges.
 * @param {number} [step=1] - The increment step for ranges (must be positive).
 * @returns {number[]} - An array of parsed integers in order.
 */
function parseRankRange(rankRange, step = 1) {}