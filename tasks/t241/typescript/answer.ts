/**
 * Format thread count into user-friendly string with customizable formatting and text
 *
 * @param count - Thread count (will be converted to integer)
 * @param padding - Minimum digits for zero-padding (only effective when useZeroPad is true)
 * @param useZeroPad - Whether to pad numbers with zeros
 * @param useThousandsSep - Whether to use thousands separator (like 1,000)
 * @param zeroStr - Text to display when thread count is 0
 * @param singular - Singular noun when thread count is 1
 * @param plural - Plural noun when thread count is greater than 1
 * @returns Formatted thread count string
 * @throws Error when count cannot be converted to non-negative integer
 */
function threadCountToFormattedString(
    count: number | string,
    padding: number = 2,
    useZeroPad: boolean = false,
    useThousandsSep: boolean = false,
    zeroStr: string = "No Threads",
    singular: string = "Thread",
    plural: string = "Threads"
): string {
    // Input validation and conversion
    let numericCount: number;
    try {
        numericCount = parseInt(count as string);
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
    let numStr: string;
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
    const threadWord: string = numericCount === 1 ? singular : plural;

    return `${numStr} ${threadWord}`;
}
