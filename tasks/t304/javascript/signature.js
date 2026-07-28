/**
 * Parses an email string and extracts the account and corresponding platform (domain) information.
 *
 * @param {*} emailStr - The string containing the email address to parse
 * @returns {Object|null} If a valid email is matched, returns an object with:
 *                        - {string} account: The local part of the email address
 *                        - {string} platform: The domain part including the @ symbol
 *                        - {string} full_email: The complete email address
 *                        Returns null if the input is not a valid email or not a string.
 */
function parseEmail(emailStr) {}