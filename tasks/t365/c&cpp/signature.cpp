#include <filesystem>
#include <map>
#include <optional>
#include <string>
#include <variant>
#include <vector>

/**
 * @brief Multi-functional current working directory utility function
 * 
 * This function provides various operations on the current working directory
 * including getting path, checking permissions, listing contents, and changing directory.
 * 
 * @param action Operation type:
 *     - "get": Get current directory path
 *     - "permissions": Check directory permissions
 *     - "list": List directory contents
 *     - "change": Change current directory
 * @param format_type Output format ("string" or "pathlib"), only valid for "get" action
 * @param follow_symlinks Whether to resolve symbolic links, only valid for "get" action
 * @param show_hidden Whether to show hidden files, only valid for "list" action
 * @param sort_by Sorting method ("name", "size", "modified"), only valid for "list" action
 * @param new_dir New directory path, only valid for "change" action
 * @return std::variant<std::string, std::filesystem::path, std::map<std::string, bool>, std::map<std::string, std::vector<std::string>>, bool, std::nullopt_t>
 *     Different results based on action type:
 *     - "get": Current directory path as string or Path object
 *     - "permissions": Dictionary with permission information
 *     - "list": Dictionary with directories and files lists
 *     - "change": True if successful, None if failed
 *     - None: If operation failed
 */
std::variant<std::string, std::filesystem::path, std::map<std::string, bool>, std::map<std::string, std::vector<std::string>>, bool, std::nullopt_t>
cwd_utils(
    const std::string& action = "get",
    const std::string& format_type = "string",
    bool follow_symlinks = true,
    bool show_hidden = false,
    const std::string& sort_by = "name",
    const std::optional<std::string>& new_dir = std::nullopt
);
