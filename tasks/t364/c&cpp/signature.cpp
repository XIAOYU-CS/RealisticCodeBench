/**
 * @brief Text processing function that supports character replacement, alphanumeric filtering, and case transformation
 * 
 * The function processes text in the following order:
 * 1. Character replacement: Replace specified characters according to the mapping table
 * 2. Alphanumeric filtering: Optionally keep only letters and numbers
 * 3. Case transformation: Convert text to uppercase, lowercase, or preserve original case
 * 
 * @param text Input text to be processed
 * @param keep_alnum Whether to keep only alphanumeric characters
 *            - true: Filter out all non-alphanumeric characters
 *            - false: Keep all characters
 * @param case_transform Case transformation mode
 *            - "upper": Convert to uppercase
 *            - "lower": Convert to lowercase
 *            - "": Preserve original case
 * @param replace_map Character replacement mapping table
 *            - Format: {{'original_char', "replacement_string"}, ...}
 *            - Example: {{'@', "at"}, {'#', "hash"}}
 * @return Processed text string
 */
std::string enhanced_text_processor(
    const std::string& text,
    bool keep_alnum = true,
    const std::string& case_transform = "upper",
    const std::unordered_map<char, std::string>& replace_map = {}
);
