/**
 * Configuration options for package name generation
 * @typedef {Object} PackageNameConfig
 * @property {string} [prefix='com.'] - Custom prefix for the package name
 * @property {string} [separator='.'] - Separator character to use
 * @property {boolean} [allowLeadingNumber=false] - Whether to allow package names starting with numbers
 */

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
 * @param {string} gameName - The input game name to convert to a package name
 * @param {PackageNameConfig} [config={}] - Configuration options for package name generation
 * @returns {string|null} The generated package name, or null if the result would be empty
 */
function generatePackageName(gameName, config = {}) {
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