/**
 * @brief Find placeholders in the format {{ placeholder }} in the given text.
 *
 * @param text Input text to search.
 * @param unique Whether to return unique results only.
 * @param return_full Whether to return full placeholders with braces.
 * @param allow_empty Whether to allow empty placeholders.
 * @return std::vector<std::string> A vector of matching placeholders in order.
 */
std::vector<std::string> find_placeholders(
    const std::string& text,
    bool unique = false,
    bool return_full = false,
    bool allow_empty = false);
