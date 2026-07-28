/**
 * @brief Truncates a long file name to a specified maximum length by inserting an ellipsis ("...") in the middle,
 *        while preserving the file extension (if present).
 *
 * @param[in] fileName The original file name to be truncated (e.g., "document_final_v2.pdf").
 * @param[in] maxLength The maximum allowed length of the resulting string. Default is 18.
 *                      Must be at least 4 to accommodate "x...y" or similar minimal forms.
 * @return The truncated file name with an ellipsis ("...") if shortened, otherwise the original name.
 */
std::string truncate_filename_with_ellipsis(const std::string& fileName, int maxLength = 18);