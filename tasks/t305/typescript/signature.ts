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
): PhoneNumberResult[] {}