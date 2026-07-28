/**
 * Text processing function that supports character replacement, alphanumeric filtering, and case transformation
 *
 * The function processes text in the following order:
 * 1. Character replacement: Replace specified characters according to the mapping table
 * 2. Alphanumeric filtering: Optionally keep only letters and numbers
 * 3. Case transformation: Convert text to uppercase, lowercase, or preserve original case
 *
 * @param {string} text - Input text to be processed
 * @param {boolean} keep_alnum - Whether to keep only alphanumeric characters
 *   - true: Filter out all non-alphanumeric characters
 *   - false: Keep all characters
 * @param {string|null} case_transform - Case transformation mode
 *   - "upper": Convert to uppercase
 *   - "lower": Convert to lowercase
 *   - null: Preserve original case
 * @param {Object|null} replace_map - Character replacement mapping table
 *   - Format: {'original_char': 'replacement_string', ...}
 *   - Example: {'@': 'at', '#': 'hash'}
 *
 * @returns {string} Processed text string
 */
function enhancedTextProcessor(text, keep_alnum = true, case_transform = "upper", replace_map = null) {
    // Initialize replacement mapping table
    if (replace_map === null) {
        replace_map = {};
    }

    // Step 1: Character replacement
    let processed_text = "";
    for (let char of text) {
        if (char in replace_map) {
            processed_text += replace_map[char];
        } else {
            processed_text += char;
        }
    }

    // Step 2: Alphanumeric filtering
    if (keep_alnum) {
        let filtered_chars = [];
        for (let char of processed_text) {
            if (/[a-zA-Z0-9]/.test(char)) {
                filtered_chars.push(char);
            }
        }
        processed_text = filtered_chars.join('');
    }

    // Step 3: Case transformation
    if (case_transform === "upper") {
        processed_text = processed_text.toUpperCase();
    } else if (case_transform === "lower") {
        processed_text = processed_text.toLowerCase();
    }

    return processed_text;
}