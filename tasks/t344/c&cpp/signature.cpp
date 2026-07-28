/**
 * @brief Split HTML string into tag blocks and non-tag text blocks by specified tags
 * 
 * @param html String containing HTML content
 * @param targetTags List of tags to match, e.g. ["div", "span"], defaults to handling p, ul, ol
 * @param preserveWhitespace Whether to preserve whitespace characters, false to automatically strip leading/trailing whitespace
 * @return std::vector<std::string> List of split content arranged in original order
 */
std::vector<std::string> splitHtmlContent(
    const std::string& html,
    const std::vector<std::string>& targetTags = {},
    bool preserveWhitespace = false
);
