/**
 * Format thread count into user-friendly string with customizable formatting and text
 *
 * @param {number|string} count - Thread count (will be converted to integer)
 * @param {number} padding - Minimum digits for zero-padding (only effective when useZeroPad is true)
 * @param {boolean} useZeroPad - Whether to pad numbers with zeros
 * @param {boolean} useThousandsSep - Whether to use thousands separator (like 1,000)
 * @param {string} zeroStr - Text to display when thread count is 0
 * @param {string} singular - Singular noun when thread count is 1
 * @param {string} plural - Plural noun when thread count is greater than 1
 * @returns {string} Formatted thread count string
 * @throws {Error} Raised when count cannot be converted to non-negative integer
 */
function threadCountToFormattedString(
    count,
    padding = 2,
    useZeroPad = false,
    useThousandsSep = false,
    zeroStr = "No Threads",
    singular = "Thread",
    plural = "Threads"
) {
    // Input validation and conversion
    let numericCount;
    try {
        numericCount = parseInt(count);
        if (isNaN(numericCount)) {
            throw new Error("Invalid number");
        }
        if (numericCount < 0) {
            throw new Error("Thread count cannot be negative");
        }
    } catch (e) {
        throw new Error(`Invalid thread count: ${count} (must be non-negative integer)`);
    }

    // Handle zero case
    if (numericCount === 0) {
        return zeroStr;
    }

    // Format numeric part
    let numStr;
    if (useThousandsSep) {
        // Thousands separator format
        numStr = numericCount.toLocaleString();
    } else {
        numStr = numericCount.toString();
        if (useZeroPad) {
            // Zero padding
            numStr = numStr.padStart(padding, '0');
        }
    }

    // Handle singular/plural forms
    const threadWord = numericCount === 1 ? singular : plural;

    return `${numStr} ${threadWord}`;
}