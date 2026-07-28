/**
 * @brief Removes the specified query parameter from a URL.
 *
 * Example:
 * @code
 * std::string url = "http://example.com/page?search=test&page=1";
 * std::string result = remove_query_param(url, "search");
 * // result == "http://example.com/page?page=1"
 * @endcode
 *
 * @param[in] url The URL from which to remove the query parameter.
 * @param[in] key The key of the query parameter to remove.
 * @return The modified URL with the specified parameter removed, or the original
 *         URL if the key was not found.
 */
std::string remove_query_param(const std::string& url, const std::string& key);