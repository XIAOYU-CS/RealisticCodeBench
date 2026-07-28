/**
 * Query minimization function supporting whitespace modes and custom comment rules
 * 
 * @param query Original text to be processed
 * @param whitespace_mode Whitespace line processing mode, optional values: preserve/remove/collapse
 * @param comment_rules Comment rule dictionary
 * @return Processed string
 */
std::string clean_query(
    const std::string& query,
    const std::string& whitespace_mode = "collapse",
    const std::map<std::string, std::vector<std::string>>& comment_rules = {{"line_comment", {"#"}}, {"block_comment", {}}}
);
