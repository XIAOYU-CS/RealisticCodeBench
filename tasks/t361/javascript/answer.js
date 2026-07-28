/**
 * Parses a string to extract dynamic identifier values and returns the remaining custom ID
 *
 * This function extracts dynamic values enclosed by specified delimiters from a string
 * and returns the custom ID portion along with the extracted dynamic value.
 *
 * @param {string} value - The input string to parse
 * @param {boolean} [dynamicValueRequired=false] - Whether to always include dynamicValue in result
 * @param {ParseDynamicIdConfig} [config] - Configuration options for parsing
 * @param {string} [config.prefix="{"] - The prefix delimiter for dynamic values
 * @param {string} [config.suffix="}_"] - The suffix delimiter for dynamic values
 * @param {RegExp} [config.regex] - Custom regular expression (takes precedence over prefix/suffix)
 *
 * @returns {ParsedDynamicId} Object containing customId and optionally dynamicValue
 */
function parseDynamicId(value, dynamicValueRequired = false, config = {}) {
  const defaultPrefix = "{";
  const defaultSuffix = "}_";

  let regex;
  if (config.regex) {
    regex = config.regex;
  } else {
    const prefix = config.prefix || defaultPrefix;
    const suffix = config.suffix || defaultSuffix;

    regex = new RegExp(
      `${escapeRegExp(prefix)}(.+?)${escapeRegExp(suffix)}`
    );
  }

  const match = regex.exec(value);
  const dynamicValue = match?.[1];
  const fullMatch = match?.[0];

  const trimLength = fullMatch?.length || 0;
  const customId = dynamicValue
    ? value.slice(trimLength)
    : value;

  const result = { customId };

  if (dynamicValue || dynamicValueRequired) {
    result.dynamicValue = dynamicValue;
  }

  return result;
}
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}