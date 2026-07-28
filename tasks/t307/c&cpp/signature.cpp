/**
 * @brief Format text as comments with specified style, supporting custom line prefixes
 * 
 * @param string Original text to be formatted
 * @param max_length Maximum length per line (including comment symbols and prefixes)
 * @param comment_style Comment style, optional values:
 *   - "hash": Python/Shell style (# comment)
 *   - "slash": C++/Java style (// comment)
 *   - "block": Block comment style (/* at beginning, * prefix per line, *\/ at end)
 * @param line_prefix Extra prefix before each comment content (such as "[NOTE] ")
 * @return Formatted comment string
 */
std::string format_comment_with_custom_style(
    const std::string& string,
    int max_length = 60,
    const std::string& comment_style = "hash",
    const std::string& line_prefix = ""
);
