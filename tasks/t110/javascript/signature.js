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
function checkEmail(text, { returnMatches = false, unique = false, strict = true, ignoreHtml = false } = {}) {}