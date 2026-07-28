
/**
 * Split HTML string into tag blocks and non-tag text blocks by specified tags
 *
 * @param {string} html - String containing HTML content
 * @param {string[]|null} [targetTags=null] - List of tags to match, e.g. ["div", "span"], defaults to handling p, ul, ol
 * @param {boolean} [preserveWhitespace=false] - Whether to preserve whitespace characters, false to automatically strip leading/trailing whitespace
 * @returns {string[]} List of split content arranged in original order
 */
function splitHtmlContent(html, targetTags = null, preserveWhitespace = false) {
    // Set default tag list
    if (targetTags === null) {
        targetTags = ['p', 'ul', 'ol'];
    }

    // Validate tag format
    const validTags = targetTags
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

    if (validTags.length === 0) {
        throw new Error("At least one valid tag must be specified");
    }

    // Escape regex special characters
    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // Build regex pattern to support tag attributes and case insensitive matching
    const patternParts = validTags.map(tag => {
        const escapedTag = escapeRegExp(tag);
        return `<${escapedTag}\\b[^>]*?>[\\s\\S]*?</${escapedTag}>`;
    });

    const pattern = new RegExp(patternParts.join('|'), 'gi');

    // Find all matching tag blocks
    const matches = [];
    let match;
    const matchCopy = new RegExp(pattern.source, pattern.flags);

    while ((match = matchCopy.exec(html)) !== null) {
        matches.push({
            match: match[0],
            start: match.index,
            end: match.index + match[0].length
        });
    }

    // Split string into non-tag parts and tag parts
    const result = [];
    let lastEnd = 0;

    for (const matchInfo of matches) {
        // Add non-tag content before this match
        let nonTagContent = html.substring(lastEnd, matchInfo.start);
        if (nonTagContent) {
            if (!preserveWhitespace) {
                nonTagContent = nonTagContent.trim();
            }
            if (nonTagContent) { // Only add non-empty content
                result.push(nonTagContent);
            }
        }

        // Add the matched tag content
        result.push(matchInfo.match);

        lastEnd = matchInfo.end;
    }

    // Handle remaining non-tag content
    let remainingContent = html.substring(lastEnd);
    if (remainingContent) {
        if (!preserveWhitespace) {
            remainingContent = remainingContent.trim();
        }
        if (remainingContent) {
            result.push(remainingContent);
        }
    }

    return result;
}