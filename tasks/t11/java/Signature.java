/**
 * Extracts all matching phone numbers from a string, with optional cleaned formatting.
 *
 * Supported formats include:
 * - International: +1-800-555-1234, +44 20 7946 0853, +86 138 1234 5678
 * - Domestic: 555-555-1234, 555 555 1234, 5555551234, (555) 555-1234
 * - Mixed: (555)555 1234, 555.555.1234
 *
 * @param s Input string to search for phone numbers
 * @param cleanFormat If true, remove all separators
 * @param includeInternational If true, include international numbers
 * @return A list of unique matched phone numbers. Returns an empty list if none found.
 */
public static List<String> extractPhoneNumbers(String s, Boolean cleanFormat, Boolean includeInternational) {}