import * as fs from 'fs';

/**
 * Interface representing environment variables as key-value pairs
 */
interface EnvVariables {
  [key: string]: string;
}

/**
 * Interface for command line options
 */
interface CliOptions {
  env_file: string;
  format: string;
  debug: boolean;
}

/**
 * Logger utility with different log levels
 */
const logger = {
  info: (message: string): void => console.log(`INFO: ${message}`),
  warn: (message: string): void => console.log(`WARNING: ${message}`),
  error: (message: string): void => console.error(`ERROR: ${message}`),
  debug: (message: string): void => console.log(`DEBUG: ${message}`)
};

/**
 * Escapes special characters in a string for use in regular expressions
 * @param str - String to escape
 * @returns Escaped string
 */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Loads and parses environment variables from a .env file
 * @param envPath - Path to the .env file
 * @returns Parsed environment variables as key-value pairs
 * @throws {Error} When file not found or parsing fails
 */
export function loadEnvFile(envPath: string): EnvVariables {
  const envVars: EnvVariables = {};

  try {
    const content = fs.readFileSync(envPath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const trimmedLine = line.trim();

      if (trimmedLine === '' || trimmedLine.startsWith('#')) {
        return;
      }

      if (!trimmedLine.includes('=')) {
        logger.warn(`Ignoring line ${lineNumber}: Invalid format (missing '=')`);
        return;
      }

      const [key, ...valueParts] = trimmedLine.split('=');
      envVars[key.trim()] = valueParts.join('=').trim();
    });

    logger.info(`Loaded ${Object.keys(envVars).length} variables from ${envPath}`);
    return envVars;
  } catch (error) {
    if (error instanceof Error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
      logger.error(`File not found: ${envPath}`);
    } else {
      logger.error(`Failed to load .env file: ${error instanceof Error ? error.message : String(error)}`);
    }
    throw error;
  }
}

/**
 * Replaces environment variable placeholders in content with actual values
 * @param content - Original content with placeholders
 * @param envVars - Environment variables to use for replacement
 * @param formatType - Placeholder format to use
 * @returns Content with placeholders replaced
 * @throws {Error} When unsupported format type is provided
 */
export function replacePlaceholders(
  content: string,
  envVars: EnvVariables,
  formatType: string
): string {
  const formatMap: Record<string, [string, string]> = {
    '${}': ['${', '}'],
    '{{}}': ['{{', '}}'],
    '%%': ['%%', '%%'],
    '[]': ['[', ']']
  };

  if (!Object.hasOwnProperty.call(formatMap, formatType)) {
    throw new Error(
      `Unsupported format: ${formatType}. Supported: ${Object.keys(formatMap).join(', ')}`
    );
  }

  const [prefix, suffix] = formatMap[formatType];
  let modifiedContent = content;
  let totalReplacements = 0;

  Object.entries(envVars).forEach(([key, value]) => {
    const placeholder = `${prefix}${key}${suffix}`;
    const escapedPlaceholder = escapeRegExp(placeholder);
    const regex = new RegExp(escapedPlaceholder, 'g');

    if (regex.test(modifiedContent)) {
      const matches = modifiedContent.match(regex);
      const occurrences = matches ? matches.length : 0;
      modifiedContent = modifiedContent.replace(regex, () => value);
      totalReplacements += occurrences;
      logger.debug(`Replaced ${occurrences} '${placeholder}' with '${value}'`);
    }
  });

  logger.info(`Total replacements: ${totalReplacements}`);
  return modifiedContent;
}
