/**
 * Parses an email string and extracts the account and corresponding platform (domain) information.
 *
 * @param emailStr - The string containing the email address to parse
 * @returns If a valid email is matched, returns an object with account, platform, and full_email
 *          Returns null if the input is not a valid email or not a string.
 */
function parseEmail(emailStr: unknown): {
    account: string;
    platform: string;
    full_email: string;
} | null {
    const emailPattern = /([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)/;

    if (typeof emailStr !== 'string') {
        return null;
    }

    const match = emailStr.match(emailPattern);

    if (match) {
        const account = match[1];
        const platform = `@${match[2]}`;
        return {
            account,
            platform,
            full_email: match[0]
        };
    } else {
        return null;
    }
}