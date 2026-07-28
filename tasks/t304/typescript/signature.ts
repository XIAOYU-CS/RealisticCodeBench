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
} | null {}