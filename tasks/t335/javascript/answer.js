/**
 * Process quotes in a string with configurable behavior control
 *
 * @param {string} line - Input string to process
 * @param {boolean} stripOuter - Whether to remove outer quotes (including escaped ones)
 * @param {boolean} escapeInner - Whether to escape internal quotes
 * @param {boolean} encloseFinal - Whether to wrap the final result with non-escaped quotes
 * @returns {string} Processed string with configured quote handling
 */
function processStringQuotes(line, stripOuter = true, escapeInner = true, encloseFinal = true) {
    let processedLine = line;

    // Remove outer quotes if requested
    if (stripOuter) {
        if (
            processedLine.length >= 2 &&
            ((processedLine.startsWith('"') && processedLine.endsWith('"')) ||
                (processedLine.startsWith("'") && processedLine.endsWith("'")))
        ) {
            processedLine = processedLine.slice(1, -1);
        }
    }

    // Process internal quotes
    if (escapeInner) {
        // Unescape internal quotes
        processedLine = processedLine.replace(/\\"/g, '"');
        processedLine = processedLine.replace(/\\'/g, "'");
    } else {
        // Escape internal quotes
        processedLine = processedLine.replace(/"/g, '\\"');
        processedLine = processedLine.replace(/'/g, "\\'");
    }

    // Enclose with quotes if requested
    if (encloseFinal) {
        return `"${processedLine}"`;
    }

    return processedLine;
}