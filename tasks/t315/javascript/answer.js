/**
 * Replaces substrings in input text based on patterns defined in a JSON configuration file.
 * Defaults to exact string matching, with optional regular expression support.
 *
 * @param {string} inputText - The text to process and perform replacements on
 * @param {string} configPath - Path to the JSON configuration file containing replacement rules
 * @param {boolean} useRegex - If true, treat patterns as regular expressions;
 *                            if false (default), use exact string matches
 * @returns {string} The modified text after all replacements have been applied
 * @throws {Error} If the configuration file doesn't exist, contains invalid JSON,
 *                 has invalid structure, or regex pattern is malformed
 */
function replaceTextWithConfig(inputText, configPath, useRegex = false) {


    try {
        // Load replacement rules from configuration file
        const configContent = require('fs').readFileSync(configPath, 'utf8');
        const config = JSON.parse(configContent);

        // Validate configuration structure
        if (!config.hasOwnProperty('replacements')) {
            throw new Error("Configuration file must contain a 'replacements' key");
        }

        if (!Array.isArray(config.replacements)) {
            throw new Error("'replacements' must be a list of replacement rules");
        }

        let processedText = inputText;

        // Apply each replacement rule
        for (const rule of config.replacements) {
            // Validate rule structure
            if (!rule || typeof rule !== 'object' || !rule.hasOwnProperty('pattern') || !rule.hasOwnProperty('replacement')) {
                continue; // Skip invalid rules
            }

            const pattern = rule.pattern;
            const replacement = rule.replacement;

            try {
                if (useRegex) {
                    // Use regex substitution (case-sensitive by default)
                    const regex = new RegExp(pattern, 'g');
                    processedText = processedText.replace(regex, replacement);
                } else {
                    // Use exact string replacement (case-sensitive)
                    // Escape special regex characters for literal replacement
                    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(escapedPattern, 'g');
                    processedText = processedText.replace(regex, replacement);
                }
            } catch (error) {
                throw new Error(`Invalid regular expression in pattern '${pattern}': ${error.message}`);
            }
        }

        return processedText;
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error(`Configuration file not found: ${configPath}`);
        } else if (error instanceof SyntaxError && error.message.includes('JSON')) {
            throw new Error(`Invalid JSON in configuration file: ${error.message}`);
        } else {
            throw error;
        }
    }
}
