/**
 * @brief Extracts the value of the 'fileId' query parameter from a given URL.
 *
 * @param url The input URL as a @c std::string. May include scheme, domain, path, and query string.
 * @return The value of the "fileId" query parameter as a @c std::string, or an empty string if not found.
 */
std::string parse_file_id_from_url(const std::string& url);