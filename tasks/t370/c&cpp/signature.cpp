/**
 * @brief List files and folders in the specified directory or current directory with sorting support
 * 
 * @param directory Optional parameter, specifies the directory path to list. If empty, lists current directory
 * @param sort_by Sorting method, options: "name" (by name), "size" (by size), "mtime" (by modification time)
 * @param reverse Whether to sort in reverse order, default false (ascending)
 * @return std::pair<bool, std::string> First element indicates success, second element is the result string
 */
std::pair<bool, std::string> command_ls(const std::string& directory = "", const std::string& sort_by = "name", bool reverse = false);
