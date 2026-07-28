const fs = require('fs');

/**
 * Parses a key-value formatted file, converting each line into an array of [processed key, processed value]
 * and returning them as a list. Empty lines are skipped.
 *
 * @param {string} filePath - Path to the file to be parsed
 * @param {function} keyProcessor - Function used to process keys, returns original key by default
 * @param {function} valueProcessor - Function used to process values, returns original value by default
 * @param {string} separator - Delimiter for key-value pairs. Uses whitespace when null (splits into max two parts)
 * @returns {Array} List containing arrays of [processed key, processed value]
 */
function parseKeyValueFormatDataFile(
    filePath,
    keyProcessor = (x) => x,
    valueProcessor = (x) => x,
    separator = null
) {}