/**
 * @brief Parse the email string and extract the account and corresponding platform (domain) information
 * 
 * @param email_str String containing the email address
 * @return If a valid email is matched, returns a dictionary {"account": account, "platform": platform domain}
 *         If no valid email is matched, returns std::nullopt
 */
std::optional<std::unordered_map<std::string, std::string>> parse_email(const std::string& email_str);
