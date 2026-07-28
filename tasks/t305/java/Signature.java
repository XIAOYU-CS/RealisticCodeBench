/**
 * Detect phone numbers in text with support for different regions and custom patterns
 *
 * @param text Text to search for phone numbers
 * @param region Region code ("global", "cn", "us") - default "global"
 * @param customPattern Custom regex pattern - if provided, overrides region pattern
 * @return List of maps containing detected phone numbers and their types
 */
public static List<Map<String, String>> detectPhoneNumbers(
        String text,
        String region,
        String customPattern) {}