/**
 * Extracts all matching phone numbers from a string, with optional cleaned formatting.
 *
 * Supported formats include:
 * - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
 * - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
 * - Mixed: (555)555 1234, 555.555.1234
 *
 * @param s - Input string to search for phone numbers
 * @param clean_format - If true, remove all separators (default: false)
 * @param include_international - If true, include international numbers (default: true)
 * @returns A list of unique matched phone numbers. Returns an empty array if none found.
 */
function extractPhoneNumbers(
    s: string,
    clean_format: boolean = false,
    include_international: boolean = true
): string[] {
    // Domestic phone number pattern (US-style)
    const domestic_pattern: string = "(?:\\(\\d{3}\\)|\\d{3})[-.\\s]?\\d{3}[-.\\s]?\\d{4}";

    let pattern: string;
    if (include_international) {
        // International phone number pattern
        // Matches +[1-3 digits][optional separator][domestic format or 12-digit format]
        const international_pattern: string = "\\+\\d{1,3}[-.\\s]?(?:\\d{1,4}[-.\\s]?){1,4}\\d{1,4}";
        // Combine both patterns
        pattern = `(${international_pattern})|(${domestic_pattern})`;
    } else {
        pattern = domestic_pattern;
    }

    // Create RegExp object with global flag to find all matches
    const regex: RegExp = new RegExp(pattern, 'g');

    // Find all matches
    let matches: RegExpExecArray[] = [];
    let match: RegExpExecArray | null;
    while ((match = regex.exec(s)) !== null) {
        matches.push(match);
        // Handle zero-length matches to prevent infinite loop
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
    }

    // Flatten matches (because of groups, match returns arrays with groups)
    let phone_numbers: string[] = [];
    for (const match of matches) {
        // Match is an array where [0] is full match, [1], [2], etc. are groups
        // Extract non-empty group (first non-empty group or full match)
        let number: string = "";
        if (match.length > 1) {
            // Look for the first non-empty capturing group
            for (let i: number = 1; i < match.length; i++) {
                if (match[i]) {
                    number = match[i];
                    break;
                }
            }
        }
        // If no groups or all groups empty, use the full match
        if (!number && match[0]) {
            number = match[0];
        }

        if (number) {
            phone_numbers.push(number);
        }
    }

    // Remove duplicates using Set
    const unique_numbers: string[] = [...new Set(phone_numbers)];

    // Clean format if requested (remove all separators)
    if (clean_format) {
        return unique_numbers.map((num: string) => num.replace(/[-. ()+]/g, ""));
    }

    return unique_numbers;
}