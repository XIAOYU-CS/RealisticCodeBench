/**
 * @brief Processes path strings to generate simplified names, supporting custom rules while preserving default behavior
 * 
 * @param path Input path string
 * @param sep Separator in the path (default '/')
 * @param replace_char Character to replace separators with (default '_')
 * @param strip_chars Characters to strip from the start and end (default '_')
 * @param remove_items List of keywords to remove (only processed if provided)
 * @param extra_suffixes Additional suffixes to remove (only processed if provided)
 * @return Processed simplified name
 */
std::string custom_format_file_path(
    const std::string& path,
    const std::string& sep = "/",
    const std::string& replace_char = "_",
    const std::string& strip_chars = "_",
    const std::vector<std::string>* remove_items = nullptr,
    const std::vector<std::string>* extra_suffixes = nullptr
);
