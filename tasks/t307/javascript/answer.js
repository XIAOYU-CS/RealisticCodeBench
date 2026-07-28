/**
 * Format text as comments with specified style, supporting custom line prefixes
 *
 * @param {string} string - Original text to be formatted
 * @param {number} [max_length=60] - Maximum length per line (including comment symbols and prefixes)
 * @param {"hash"|"slash"|"block"} [comment_style="hash"] - Comment style
 * @param {string} [line_prefix=""] - Extra prefix before each comment content (such as "[NOTE] ")
 * @returns {string} Formatted comment string
 */
function formatCommentWithCustomStyle(string, max_length = 60, comment_style = "hash", line_prefix = "") {
    const stylePrefixes = {
        hash: "# ",
        slash: "// ",
        block: "* "
    };

    if (!stylePrefixes.hasOwnProperty(comment_style)) {
        throw new Error(`Unsupported comment style: ${comment_style}, available values: ${Object.keys(stylePrefixes).join(', ')}`);
    }

    const basePrefix = stylePrefixes[comment_style];
    const prefixTotal = basePrefix + line_prefix;
    const contentMaxLength = max_length - prefixTotal.length;

    if (contentMaxLength <= 0) {
        throw new Error(`Maximum length (${max_length}) is too small to accommodate comment symbols and prefixes`);
    }

    const lines = string.split('\n');
    const allWords = [];
    for (const line of lines) {
        allWords.push(...line.split(/\s+/).filter(Boolean));
    }

    const formattedLines = [];
    let currentLine = [];
    let currentLen = 0;

    for (const word of allWords) {
        const wordLen = word.length;
        const neededLen = currentLen + (currentLine.length > 0 ? wordLen + 1 : wordLen);

        if (neededLen > contentMaxLength) {
            formattedLines.push(currentLine.join(' '));
            currentLine = [word];
            currentLen = wordLen;
        } else {
            currentLine.push(word);
            currentLen = neededLen;
        }
    }

    if (currentLine.length > 0) {
        formattedLines.push(currentLine.join(' '));
    }

    const prefixedLines = formattedLines.map(line => prefixTotal + line);

    if (comment_style === "block") {
        return `/*\n${prefixedLines.join('\n')}\n*/`;
    } else {
        return prefixedLines.join('\n');
    }
}
