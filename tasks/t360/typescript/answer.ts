interface PackageNameConfig {
  prefix?: string;
  separator?: string;
  allowLeadingNumber?: boolean;
}

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
 * @param gameName - The input game name to convert to a package name
 * @param config - Configuration options for package name generation
 * @param config.prefix - Custom prefix for the package name (default: "com.")
 * @param config.separator - Separator character to use (default: ".")
 * @param config.allowLeadingNumber - Whether to allow package names starting with numbers (default: false)
 *
 * @returns The generated package name, or null if the result would be empty
 */
function generatePackageName(
  gameName: string,
  config: PackageNameConfig = {}
): null | string {
  // Parse configuration with default values
  const {
    prefix = 'com.',
    separator = '.',
    allowLeadingNumber = false
  } = config;

  // Validate input
  if (!gameName || typeof gameName !== 'string') {
    return null;
  }

  let normalizedGameName = gameName.trim().toLowerCase();

  // Escape separator for use in regex
  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Replace spaces, underscores, and hyphens with the configured separator
  normalizedGameName = normalizedGameName.replace(/[\s_\-]+/g, separator);

  // Keep only alphanumeric characters and the configured separator
  normalizedGameName = normalizedGameName.replace(
    new RegExp(`[^\\d${escapedSeparator}a-z]`, 'g'),
    ''
  );

  // Merge consecutive separators
  normalizedGameName = normalizedGameName.replace(
    new RegExp(`${escapedSeparator}+`, 'g'),
    separator
  );

  // Remove leading and trailing separators
  normalizedGameName = normalizedGameName
    .replace(new RegExp(`^${escapedSeparator}+`), '')
    .replace(new RegExp(`${escapedSeparator}+$`), '');

  // Handle leading number case based on configuration
  if (!allowLeadingNumber && /^\d/.test(normalizedGameName)) {
    normalizedGameName = `app${separator}` + normalizedGameName;
  }

  // Return null if result is empty
  if (normalizedGameName === '') {
    return null;
  }

  return prefix + normalizedGameName;
}