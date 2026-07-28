/**
 * Format text as comments with specified style, supporting custom line prefixes
 *
 * @param string - Original text to be formatted
 * @param maxLength - Maximum length per line (including comment symbols and prefixes)
 * @param commentStyle - Comment style, optional values: 'hash', 'slash', 'block'
 * @param linePrefix - Extra prefix before each comment content (such as "[NOTE] ")
 * @returns Formatted comment string
 */
function formatComment(
    string: string,
    maxLength: number = 60,
    commentStyle: 'hash' | 'slash' | 'block' = 'hash',
    linePrefix: string = ''
): string {
    // Validate input type
    if (typeof string !== 'string') {
        throw new TypeError(`Expected string type, received ${typeof string}`);
    }

    // Define base prefixes for different comment styles
    const stylePrefixes: Record<string, string> = {
        "hash": "# ",
        "slash": "// ",
        "block": "* "
    };

    // Validate comment style
    if (!stylePrefixes.hasOwnProperty(commentStyle)) {
        throw new Error(`Unsupported comment style: ${commentStyle}, available values: ${Object.keys(stylePrefixes)}`);
    }

    // Calculate base prefix length (used to adjust content maximum length)
    const basePrefix = stylePrefixes[commentStyle];
    const prefixTotal = basePrefix + linePrefix;
    const contentMaxLen = maxLength - prefixTotal.length;

    // Ensure there's enough space for content
    if (contentMaxLen <= 0) {
        throw new Error(`Maximum length (${maxLength}) is too small to accommodate comment symbols and prefixes`);
    }

    // Split original text into lines
    const lines = string.split('\n');
    const allWords: string[] = [];
    for (const line of lines) {
        allWords.push(...line.split(/\s+/).filter(word => word.length > 0)); // Extract all words
    }

    // Reformat words into lines
    const formattedLines: string[] = [];
    let currentLine: string[] = [];
    let currentLen = 0;

    for (const word of allWords) {
        // Calculate length needed to add current word (including space)
        const wordLen = word.length;
        const neededLen = currentLen + (currentLine.length > 0 ? wordLen + 1 : wordLen);

        if (neededLen > contentMaxLen) {
            // Current line is full, add to results
            if (currentLine.length > 0) {
                formattedLines.push(currentLine.join(' '));
            }
            currentLine = [word];
            currentLen = wordLen;
        } else {
            currentLine.push(word);
            currentLen = neededLen;
        }
    }

    // Add the last line
    if (currentLine.length > 0) {
        formattedLines.push(currentLine.join(' '));
    }

    // Apply prefixes
    const prefixedLines = formattedLines.map(line => prefixTotal + line);

    // Handle block comment start and end markers
    if (commentStyle === "block") {
        return `/*\n${prefixedLines.join('\n')}\n*/`;
    } else {
        return prefixedLines.join('\n');
    }
}