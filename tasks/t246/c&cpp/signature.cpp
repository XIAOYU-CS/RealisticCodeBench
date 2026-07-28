#include <map>
#include <string>

/**
 * @brief Converts a map of key-value parameters into a URL-encoded query string.
 *
 * Example:
 * @code
 * std::map<std::string, std::string> params = {
 *     {"search", "hello world"},
 *     {"page", "1"},
 *     {"filter", "type=a&b"}
 * };
 * auto qs = toQueryString(params);
 * // Result: "?search=hello%20world&page=1&filter=type%3Da%26b"
 * @endcode
 *
 * @param[in] params A map of string key-value pairs to encode.
 * @return A URL-encoded query string starting with '?', or an empty string if @p params is empty.
 */
std::string toQueryString(const std::map<std::string, std::string>& params);
