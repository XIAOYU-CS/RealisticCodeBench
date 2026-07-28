/**
 * Check if text contains email addresses and support extracting matches with advanced options.
 *
 * @param text - Text to check for email addresses
 * @param options - Configuration options
 * @param options.returnMatches - Whether to return list of matched emails
 * @param options.unique - Whether to return deduplicated results (only effective when returnMatches=true)
 * @param options.strict - Whether to enable strict mode (disallows IP as domain)
 * @param options.ignoreHtml - Whether to ignore emails within HTML tags
 * @returns Boolean or array of matched emails based on returnMatches flag
 * @throws {TypeError} If input text is not a string
 */
function checkEmail(
    text: string,
    options: {
        returnMatches?: boolean;
        unique?: boolean;
        strict?: boolean;
        ignoreHtml?: boolean;
    } = {}
): boolean | string[] {}