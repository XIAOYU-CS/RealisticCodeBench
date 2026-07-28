/**
 * @brief Extracts the file extension from a given file name.
 *
 * @param[in] file_name The full file name (e.g., "document.pdf", "archive.tar.gz").
 * @return The file extension without the leading dot (e.g., "pdf", "gz"),
 *         or an empty string if no valid extension exists.
 */
std::string extract_file_extension(const std::string& file_name);