/**
 * Configuration options for parsing dynamic identifiers from strings
 * @typedef {Object} ParseDynamicIdConfig
 * @property {string} [prefix="{"] - The prefix delimiter for dynamic values
 * @property {string} [suffix="}_"] - The suffix delimiter for dynamic values
 * @property {RegExp} [regex] - Custom regular expression (takes precedence over prefix/suffix)
 */

type ParseDynamicIdConfig = {
  prefix?: string;
  suffix?: string;
  regex?: RegExp;
};

/**
 * Result object containing parsed dynamic identifier information
 * @typedef {Object} ParsedDynamicId
 * @property {string} customId - The remaining string after removing dynamic part
 * @property {string} [dynamicValue] - The extracted dynamic value (present when found or required)
 */

type ParsedDynamicId = {
  customId: string;
  dynamicValue?: string;
};

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
function parseDynamicId(
  value: string,
  dynamicValueRequired = false,
  config: ParseDynamicIdConfig = {}
): ParsedDynamicId {}