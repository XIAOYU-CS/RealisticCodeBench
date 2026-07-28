/**
 * @brief Enhanced change directory function with history tracking, special path support, and additional features
 * 
 * This function provides enhanced directory navigation capabilities including
 * history tracking, special path handling, and robust error management.
 * 
 * @param target Target directory path, nullptr returns current directory info only
 * @param history_limit Maximum number of history entries to maintain
 * @param preserve_history Whether to preserve directory change history
 * @return std::tuple<bool, std::string, std::optional<std::string>> Tuple of (success_flag, result_message, new_working_directory_or_nullopt):
 * - success_flag: Boolean indicating if operation succeeded
 * - result_message: Descriptive message about the operation result
 * - new_working_directory_or_nullopt: New working directory path or nullopt if failed
 */
std::tuple<bool, std::string, std::optional<std::string>> enhanced_cd(
    const std::optional<std::string>& target = std::nullopt,
    int history_limit = 10,
    bool preserve_history = true
);
