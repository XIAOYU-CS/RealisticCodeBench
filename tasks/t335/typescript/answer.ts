/**
 * Process quotes in a string with configurable behavior control
 *
 * @param line - Input string to process
 * @param stripOuter - Whether to remove outer quotes (including escaped ones)
 * @param escapeInner - Whether to escape internal quotes
 * @param encloseFinal - Whether to wrap the final result with non-escaped quotes
 * @returns Processed string with configured quote handling
 */
function processStringQuotes(
    line: string,
    stripOuter: boolean = true,
    escapeInner: boolean = true,
    encloseFinal: boolean = true
): string {
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