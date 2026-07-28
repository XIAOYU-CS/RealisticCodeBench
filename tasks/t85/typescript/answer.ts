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
 * @param text - Input text to search.
 * @param unique - Whether to return unique results only. Default is false.
 * @param returnFull - Whether to return full placeholders (with {{}}). Default is false.
 * @param allowEmpty - Whether to allow empty placeholders. Default is false.
 * @returns List of matched placeholders in the order they appear.
 * @throws {TypeError} If the input text is not a string.
 */
function findPlaceholders(
    text: string,
    unique: boolean = false,
    returnFull: boolean = false,
    allowEmpty: boolean = false
): string[] {
    if (typeof text !== 'string') {
        throw new TypeError("Input 'text' must be a string.");
    }

    const pattern = /{{\s*([\w\-.]*?)\s*}}/g;

    let matches: string[] = [];
    let match: RegExpExecArray | null;

    // Use exec() with global flag to iterate through all matches
    while ((match = pattern.exec(text)) !== null) {
        const fullMatch: string = match[0];
        const innerContent: string = match[1];

        // Skip empty placeholders if not allowed
        if (!allowEmpty && innerContent.trim() === '') {
            continue;
        }

        // Append full match or inner content based on returnFull flag
        matches.push(returnFull ? fullMatch : innerContent);
    }

    // Remove duplicates while preserving order if required
    if (unique) {
        const seen = new Set<string>();
        const uniqueMatches: string[] = [];
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