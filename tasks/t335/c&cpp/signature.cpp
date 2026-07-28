/**
 * @brief Process quotes in a string with configurable behavior control
 * 
 * @param line Input string to process
 * @param strip_outer Whether to remove outer quotes (including escaped ones)
 * @param escape_inner Whether to escape internal quotes
 * @param enclose_final Whether to wrap the final result with non-escaped quotes
 * @return Processed string with configured quote handling
 */
std::string process_string_quotes(
    const std::string& line,
    bool strip_outer = true,
    bool escape_inner = true,
    bool enclose_final = true
);
