/**
 * @brief Validates a password against a set of security requirements.
 *
 * A password is considered valid if it satisfies all of the following criteria:
 * - Contains at least one digit (0–9),
 * - Contains at least one lowercase letter (a–z),
 * - Contains at least one uppercase letter (A–Z),
 * - Contains at least one punctuation character (as defined by @c std::ispunct, e.g., !, @, #, $, etc.),
 * - Has a minimum length of 8 characters.
 *
 * @param password The password string to validate.
 * @return @c true if the password meets all the specified requirements; @c false otherwise.
 */
bool is_valid_password(const std::string& password);