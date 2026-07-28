#include <string>
#include <utility>
#include <variant>
#include <vector>

/**
 * @brief Move one or more files or directories to a destination path.
 *
 * @param sources A single source path or a list of source paths to move.
 * @param destination The destination path where files/directories will be moved.
 * @param overwrite Whether to overwrite the destination if it already exists. Default is false.
 * @return A pair containing:
 *         - success_list: source paths that were successfully moved.
 *         - fail_list: failed moves as (source_path, error_message).
 * @throws std::invalid_argument If multiple sources are provided and the destination is not an existing directory.
 */
std::pair<std::vector<std::string>, std::vector<std::pair<std::string, std::string>>>
mv(const std::variant<std::string, std::vector<std::string>>& sources,
   const std::string& destination,
   bool overwrite = false);

std::pair<std::vector<std::string>, std::vector<std::pair<std::string, std::string>>>
mv(const std::string& source, const std::string& destination, bool overwrite = false);

std::pair<std::vector<std::string>, std::vector<std::pair<std::string, std::string>>>
mv(const std::vector<std::string>& sources, const std::string& destination, bool overwrite = false);
