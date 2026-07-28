/**
 * @brief Generates a package name from a game name according to the specified configuration.
 * 
 * This function normalizes the input game name by:
 * - Converting to lowercase
 * - Replacing spaces, underscores, and hyphens with the specified separator
 * - Removing invalid characters (keeping only alphanumeric characters and separators)
 * - Merging consecutive separators
 * - Removing leading and trailing separators
 * - Adding a prefix to prevent leading numbers if not allowed
 * 
 * @param game_name The input game name to convert to a package name
 * @param config Configuration options for package name generation
 *   - prefix (std::string): Custom prefix for the package name (default: "com.")
 *   - separator (std::string): Separator character to use (default: ".")
 *   - allowLeadingNumber (bool): Whether to allow package names starting with numbers (default: false)
 * @return std::string The generated package name, or an empty string if the result would be empty
 */
#include <optional>
#include <string>
#include <unordered_map>
#include <variant>

std::optional<std::string> generate_package_name(const std::string& game_name, const std::unordered_map<std::string, std::variant<std::string, bool>>& config = {});
