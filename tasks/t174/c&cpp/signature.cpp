#include <string>

/**
 * @brief Validates a username based on predefined format rules.
 *
 * A username is considered valid if all of the following conditions are satisfied:
 * - Its length is between 5 and 16 characters, inclusive.
 * - It consists exclusively of alphanumeric characters (A–Z, a–z, 0–9) and space characters (' ').
 *
 * @param username The username string to validate.
 * @return @c true if the username meets all validity criteria; @c false otherwise.
 */
bool is_valid_username(const std::string& username);
