/**
 * Find placeholders in the format {{ placeholder }} in the given text.
 * Supports multiple matching modes.
 *
 * Enhanced features:
 * - Supports placeholders containing letters, digits, underscores, dots, and hyphens.
 * - Optionally returns unique results.
 * - Optionally returns full placeholders (with {{}}) or just the inner content.
 * - Optionally allows empty placeholders (e.g., {{   }}).
 *
 * @param {string} text - Input text to search.
 * @param {boolean} [unique=false] - Whether to return unique results only.
 * @param {boolean} [returnFull=false] - Whether to return full placeholders (with {{}}).
 * @param {boolean} [allowEmpty=false] - Whether to allow empty placeholders.
 * @returns {string[]} List of matched placeholders in the order they appear.
 * @throws {TypeError} If the input text is not a string.
 */
function findPlaceholders(text, unique = false, returnFull = false, allowEmpty = false) {
    // Type check
    if (typeof text !== 'string') {
        throw new TypeError("Input 'text' must be a string.");
    }

    // Regular expression pattern:
    // Matches {{ placeholder }}, allowing letters, digits, _, -, and .
    // Group 1: inner content (without {{}}); Group 0: full match (with {{}})
    const pattern = /{{\s*([\w\-.]*?)\s*}}/g;

    let matches = [];
    let match;

    // Use exec() with global flag to iterate through all matches
    while ((match = pattern.exec(text)) !== null) {
        const fullMatch = match[0];
        const innerContent = match[1];

        // Skip empty placeholders if not allowed
        if (!allowEmpty && innerContent.trim() === '') {
            continue;
        }

        // Append full match or inner content based on returnFull flag
        matches.push(returnFull ? fullMatch : innerContent);
    }

    // Remove duplicates while preserving order if required
    if (unique) {
        const seen = new Set();
        const uniqueMatches = [];
        for (const item of matches) {
            if (!seen.has(item)) {
                seen.add(item);
                uniqueMatches.push(item);
            }
        }
        matches = uniqueMatches;
    }

    return matches;
}