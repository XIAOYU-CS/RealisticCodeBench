package org.real.temp;

import java.util.Map;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Answer {

    /**
     * Parses a string to extract dynamic identifier values and returns the remaining custom ID
     *
     * This function extracts dynamic values enclosed by specified delimiters from a string
     * and returns the custom ID portion along with the extracted dynamic value.
     *
     * @param value The input string to parse
     * @param dynamicValueRequired Whether to always include dynamic_value in result
     * @param config Configuration options for parsing
     *               - prefix: The prefix delimiter for dynamic values (default: "{")
     *               - suffix: The suffix delimiter for dynamic values (default: "}_")
     *               - regex: Custom regular expression (takes precedence over prefix/suffix)
     * @return Map containing custom_id and optionally dynamic_value
     */
    public static Map<String, String> parseDynamicId(String value, boolean dynamicValueRequired, Map<String, Object> config) {
        Map<String, String> result = new HashMap<>();

        if (config == null) {
            config = new HashMap<>();
        }

        String defaultPrefix = "{";
        String defaultSuffix = "}_";

        Pattern regex;
        if (config.get("regex") != null) {
            regex = (Pattern) config.get("regex");
        } else {
            String prefix = (String) config.getOrDefault("prefix", defaultPrefix);
            String suffix = (String) config.getOrDefault("suffix", defaultSuffix);
            String pattern = Pattern.quote(prefix) + "(.+?)" + Pattern.quote(suffix);
            regex = Pattern.compile(pattern);
        }

        Matcher match = regex.matcher(value);
        String dynamicValue = null;
        String fullMatch = null;

        if (match.find()) {
            dynamicValue = match.group(1);
            fullMatch = match.group(0);
        }

        int trimLength = (fullMatch != null) ? fullMatch.length() : 0;
        String customId = (dynamicValue != null) ? value.substring(trimLength) : value;

        result.put("custom_id", customId);

        if (dynamicValue != null || dynamicValueRequired) {
            result.put("dynamic_value", dynamicValue);
        }

        return result;
    }

    /**
     * Parses a string to extract dynamic identifier values with default parameters
     *
     * @param value The input string to parse
     * @return Map containing custom_id and optionally dynamic_value
     */
    public static Map<String, String> parseDynamicId(String value) {
        return parseDynamicId(value, false, null);
    }

    /**
     * Parses a string to extract dynamic identifier values with dynamic value required flag
     *
     * @param value The input string to parse
     * @param dynamicValueRequired Whether to always include dynamic_value in result
     * @return Map containing custom_id and optionally dynamic_value
     */
    public static Map<String, String> parseDynamicId(String value, boolean dynamicValueRequired) {
        return parseDynamicId(value, dynamicValueRequired, null);
    }
}