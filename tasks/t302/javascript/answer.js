/**
 * Processes path strings to generate simplified names, supporting custom rules while preserving default behavior
 *
 * @param {string} path - Input path string
 * @param {string} [sep="/"] - Separator in the path
 * @param {string} [replaceChar="_"] - Character to replace separators with
 * @param {string} [stripChars="_"] - Characters to strip from the start and end
 * @param {string[]|null} [removeItems=null] - List of keywords to remove (only processed if provided)
 * @param {string[]|null} [extraSuffixes=null] - Additional suffixes to remove (only processed if provided)
 * @returns {string} Processed simplified name
 */
function customFormatFilePath(
    path,
    sep = "/",
    replaceChar = "_",
    stripChars = "_",
    removeItems = null,
    extraSuffixes = null
) {
    // Replace path separators and strip specified characters from start and end
    let newPath = path.replace(new RegExp(sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replaceChar);

    // Strip characters from start and end
    if (stripChars) {
        const stripCharsRegex = new RegExp(`^[${stripChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+|[${stripChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]+$`, 'g');
        newPath = newPath.replace(stripCharsRegex, '');
    }

    // Remove specified keywords (with replacement character suffix) - only if removeItems is provided
    if (removeItems !== null) {
        for (const item of removeItems) {
            const pattern = `${item}${replaceChar}`;
            newPath = newPath.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "");
        }
    }

    // Remove extra suffixes - only if extraSuffixes is provided
    if (extraSuffixes !== null) {
        for (const suffix of extraSuffixes) {
            newPath = newPath.replace(new RegExp(suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), "");
        }
    }

    return newPath;
}
