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
public static String generatePackageName(String gameName, Map<String, Object> config) {}