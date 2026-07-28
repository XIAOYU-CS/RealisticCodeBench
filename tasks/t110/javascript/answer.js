/**
 * Check if text contains email addresses and support extracting matches with advanced options.
 *
 * @param {string} text - Text to check for email addresses
 * @param {boolean} [returnMatches=false] - Whether to return list of matched emails
 * @param {boolean} [unique=false] - Whether to return deduplicated results (only effective when returnMatches=true)
 * @param {boolean} [strict=true] - Whether to enable strict mode (disallows IP as domain)
 * @param {boolean} [ignoreHtml=false] - Whether to ignore emails within HTML tags
 * @returns {boolean|Array<string>} - Boolean or array of matched emails based on returnMatches flag
 * @throws {TypeError} - If input text is not a string
 */
function checkEmail(text, { returnMatches = false, unique = false, strict = true, ignoreHtml = false } = {}) {
    // Type validation
    if (typeof text !== 'string') {
        throw new TypeError("Input text must be a string");
    }

    // Process HTML ignoring: remove content within angle brackets
    let processedText = text;
    if (ignoreHtml) {
        processedText = processedText.replace(/<[^>]*>/g, '');
    }

    // Define email regex pattern based on mode
    let emailPattern;
    if (strict) {
        // Strict mode: disallow IP addresses as domain, require proper TLD
        emailPattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
    } else {
        // Non-strict mode: allows IP addresses as domain
        emailPattern = /\b[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b))\b/g;
    }

    // Find all matches
    const matches = processedText.match(emailPattern) || [];

    // Remove duplicates while preserving order if required
    let resultMatches = matches;
    if (unique && matches.length > 0) {
        const seen = new Set();
        resultMatches = [];
        for (const email of matches) {
            if (!seen.has(email)) {
                seen.add(email);
                resultMatches.push(email);
            }
        }
    }

    // Return result based on parameter
    if (returnMatches) {
        return resultMatches;
    } else {
        return resultMatches.length > 0;
    }
}