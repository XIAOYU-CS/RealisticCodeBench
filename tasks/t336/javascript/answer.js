const path = require('path');

/**
 * Check if the input string is a valid path format.
 *
 * @param {*} pathStr - The string to check for valid path format
 * @returns {boolean} True if the string is a valid path format (absolute path or
 *                    relative path with at least two parts), False otherwise
 */
function isValidPathFormat(pathStr) {
    if (typeof pathStr !== 'string') {
        return false;
    }

    try {
        const isAbsolute = path.isAbsolute(pathStr);

        const parsed = path.parse(pathStr);
        const dirParts = parsed.dir.split(path.sep).filter(part => part !== '');
        const hasFileName = parsed.base && parsed.base !== '.' && parsed.base !== '..';

        const totalParts = dirParts.length + (hasFileName ? 1 : 0);

        return isAbsolute || totalParts > 1;
    } catch (error) {
        return false;
    }
}
