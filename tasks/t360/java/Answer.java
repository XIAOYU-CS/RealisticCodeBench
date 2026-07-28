package org.real.temp;

import java.util.Map;
import java.util.HashMap;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class Answer {

    /**
     * Generates a package name from a game name according to the specified configuration.
     *
     * This function normalizes the input game name by:
     * - Converting to lowercase
     * - Replacing spaces, underscores, and hyphens with the specified separator
     * - Removing invalid characters (keeping only alphanumeric characters and separators)
     * - Merging consecutive separators
     * - Removing leading and trailing separators
     * - Adding a prefix to prevent leading numbers if not allowed
     *
     * @param gameName The input game name to convert to a package name
     * @param config Configuration options for package name generation
     *               - prefix (String): Custom prefix for the package name (default: "com.")
     *               - separator (String): Separator character to use (default: ".")
     *               - allowLeadingNumber (Boolean): Whether to allow package names starting with numbers (default: false)
     * @return The generated package name, or null if the result would be empty
     */
    public static String generatePackageName(String gameName, Map<String, Object> config) {
        // Handle null config
        if (config == null) {
            config = new HashMap<>();
        }

        // Parse configuration with default values
        String prefix = (String) config.getOrDefault("prefix", "com.");
        String separator = (String) config.getOrDefault("separator", ".");
        boolean allowLeadingNumber = (Boolean) config.getOrDefault("allowLeadingNumber", false);

        // Validate input
        if (gameName == null || gameName.trim().isEmpty()) {
            return null;
        }

        String normalizedGameName = gameName.trim().toLowerCase();

        // Escape separator for use in regex
        String escapedSeparator = Pattern.quote(separator);

        // Replace spaces, underscores, and hyphens with the configured separator
        normalizedGameName = normalizedGameName.replaceAll("[\\s_\\-]+", separator);

        // Keep only alphanumeric characters and the configured separator
        normalizedGameName = normalizedGameName.replaceAll("[^\\d" + escapedSeparator + "a-z]", "");

        // Merge consecutive separators
        normalizedGameName = normalizedGameName.replaceAll(escapedSeparator + "+", separator);

        // Remove leading and trailing separators
        normalizedGameName = normalizedGameName.replaceAll("^" + escapedSeparator + "+", "");
        normalizedGameName = normalizedGameName.replaceAll(escapedSeparator + "+$", "");

        // Handle leading number case based on configuration
        if (!allowLeadingNumber && normalizedGameName.matches("^\\d.*")) {
            normalizedGameName = "app" + separator + normalizedGameName;
        }

        // Return null if result is empty
        if (normalizedGameName.isEmpty()) {
            return null;
        }

        return prefix + normalizedGameName;
    }

    /**
     * Generates a package name from a game name with default configuration.
     *
     * @param gameName The input game name to convert to a package name
     * @return The generated package name, or null if the result would be empty
     */
    public static String generatePackageName(String gameName) {
        return generatePackageName(gameName, null);
    }
}