package org.real.temp;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Answer {

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
            String customPattern) {

        // Define region patterns
        Map<String, String> regionPatterns = new HashMap<>();
        regionPatterns.put("global", "\\+?\\d{1,3}[-\\s]?\\(?\\d{3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{2,4}");
        regionPatterns.put("cn", "1[3-9]\\d{9}|\\+861[3-9]\\d{9}");  // Chinese mobile numbers
        regionPatterns.put("us", "\\+1[-\\s]?\\(?\\d{3}\\)?[-\\s]?\\d{3}[-\\s]?\\d{4}");  // US phone numbers

        // Determine which pattern to use
        String pattern;
        if (customPattern != null && !customPattern.isEmpty()) {
            pattern = customPattern;
        } else {
            pattern = regionPatterns.getOrDefault(region, regionPatterns.get("global"));
        }

        // Find all matches
        Pattern compiledPattern = Pattern.compile(pattern);
        Matcher matcher = compiledPattern.matcher(text);

        List<String> phoneNumbers = new ArrayList<>();
        while (matcher.find()) {
            phoneNumbers.add(matcher.group());
        }

        // Classify number types
        List<Map<String, String>> results = new ArrayList<>();
        for (String num : phoneNumbers) {
            Map<String, String> result = new HashMap<>();
            result.put("number", num);

            String numType = "local";
            if (num.startsWith("+")) {
                numType = "international";
            }
            if ("cn".equals(region)) {
                String cleanNum = num.replace("+86", "").replace(" ", "");
                if (cleanNum.length() == 11) {
                    numType = "cn_mobile";
                }
            }

            result.put("type", numType);
            results.add(result);
        }

        return results;
    }

    // Overloaded method with default parameters
    public static List<Map<String, String>> detectPhoneNumbers(String text) {
        return detectPhoneNumbers(text, "global", null);
    }

    // Overloaded method with region only
    public static List<Map<String, String>> detectPhoneNumbers(String text, String region) {
        return detectPhoneNumbers(text, region, null);
    }
}
