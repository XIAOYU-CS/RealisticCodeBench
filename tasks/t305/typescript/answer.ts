interface PhoneNumberResult {
    number: string;
    type: 'international' | 'local' | 'cn_mobile';
}

/**
 * Detect phone numbers in text
 *
 * @param {string} text - The text to search for phone numbers
 * @param {string} [region="global"] - Region code, supports "global", "cn", "us"
 * @param {string|null} [customPattern=null] - Custom regular expression pattern
 * @returns {Array<Object>} Array of detected phone numbers, each object contains number and type
 * @returns {string} returns[].number - Phone number
 * @returns {string} returns[].type - Number type ("international" | "local" | "cn_mobile")
 */
function detectPhoneNumbers(
    text: string,
    region: string = "global",
    customPattern: string | null = null
): PhoneNumberResult[] {
    const regionPatterns: { [key: string]: RegExp } = {
        "global": /\+?\d{1,3}[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{2,4}/g,
        "cn": /1[3-9]\d{9}|\+861[3-9]\d{9}/g,  // Chinese mobile numbers
        "us": /\+1[-\s]?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}/g  // US phone numbers
    };

    // Determine which pattern to use
    const pattern = customPattern ? new RegExp(customPattern, 'g') :
                   (regionPatterns[region] || regionPatterns["global"]);

    // Find all matches
    const matches = text.match(pattern) || [];

    // Remove duplicates and process matches
    const uniqueMatches = [...new Set(matches)];

    // Classify number types
    const results: PhoneNumberResult[] = [];
    for (const num of uniqueMatches) {
        let numType: 'international' | 'local' | 'cn_mobile' = num.startsWith("+") ? "international" : "local";
        if (region === "cn" && num.replace("+86", "").replace(/\s/g, "").length === 11) {
            numType = "cn_mobile";
        }
        results.push({"number": num, "type": numType});
    }

    return results;
}