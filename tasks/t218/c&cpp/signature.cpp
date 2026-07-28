/**
 * @brief Removes the file extension from the given file name.
 *
 * @param[in] file_name The full file name (e.g., "document.pdf", "archive.tar.gz", ".gitignore").
 * @return The file name without its extension (e.g., "document", "archive.tar", ".gitignore").
 */
std::string remove_file_extension(const std::string& file_name);