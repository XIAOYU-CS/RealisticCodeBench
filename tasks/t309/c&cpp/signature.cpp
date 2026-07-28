/**
 * @brief Check if the permission string meets the specified read/write/execute permission requirements
 * 
 * @param line Line containing permission information, typically from 'ls -l' command output.
 *             Expected format: "-rwxr-xr-- 1 user group 1024 Jan 1 12:00 filename"
 * @param required_perms List of required permissions, e.g., {"r", "x"} means read and execute permissions are needed
 * @param user_category User category to check (owner/group/other users)
 * @return Whether all specified permission requirements are met
 */
bool check_permissions(
    const std::string& line,
    const std::optional<std::vector<std::string>>& required_perms = std::nullopt,
    const std::string& user_category = "other"
);
