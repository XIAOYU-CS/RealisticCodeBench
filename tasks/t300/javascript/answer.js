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
) {
    if (keyProcessor == null) {
        keyProcessor = (x) => x;
    }
    if (valueProcessor == null) {
        valueProcessor = (x) => x;
    }

    const results = [];
    const content = require('fs').readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const lineNumber = i + 1; // Line numbers start at 1
        const originalLine = lines[i].trim();

        if (!originalLine) {
            continue; // Skip empty lines
        }

        let parts;
        if (separator === null) {
            const match = originalLine.match(/^(\S+)\s+([\s\S]*)$/);
            parts = match ? [match[1], match[2]] : [originalLine];
        } else {
            if (separator === '') {
                throw new Error('empty separator');
            }
            const separatorIndex = originalLine.indexOf(separator);
            parts = separatorIndex >= 0
                ? [originalLine.slice(0, separatorIndex), originalLine.slice(separatorIndex + separator.length)]
                : [originalLine];
        }

        if (parts.length !== 2) {
            throw new Error(`Line ${lineNumber} format error: must contain key and value (content: ${originalLine})`);
        }

        try {
            const key = keyProcessor(parts[0]);
            const value = valueProcessor(parts[1]);
            results.push([key, value]);
        } catch (e) {
            throw new Error(`Line ${lineNumber} processing failed: ${e.message} (content: ${originalLine})`);
        }
    }

    return results;
}
