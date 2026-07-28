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
function parseEmail(emailStr) {
    const emailPattern = /([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/;

    if (typeof emailStr !== 'string') {
        return null;
    }

    const match = emailStr.match(emailPattern);

    if (match) {
        const account = match[1];
        const platform = `@${match[2]}`;
        return {
            account: account,
            platform: platform,
            full_email: match[0]
        };
    } else {
        return null;
    }
}