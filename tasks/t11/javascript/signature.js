/**
 * Extracts all matching phone numbers from a string, with optional cleaned formatting.
 *
 * Supported formats include:
 * - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
 * - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
 * - Mixed: (555)555 1234, 555.555.1234
 *
 * @param {string} s - Input string to search for phone numbers
 * @param {boolean} clean_format - If true, remove all separators (default: false)
 * @param {boolean} include_international - If true, include international numbers (default: true)
 * @returns {string[]} A list of unique matched phone numbers. Returns an empty array if none found.
 */
function extractPhoneNumbers(s, clean_format = false, include_international = true) {}