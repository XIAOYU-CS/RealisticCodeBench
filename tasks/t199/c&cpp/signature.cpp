/**
 * @brief Calculates the age from a given birth date string and returns a formatted result string.
 *
 * @param birthDateString The birth date as a string, typically in ISO 8601 format ("YYYY-MM-DD").
 * @return A @c std::string containing the original date and age (e.g., "1990-05-15 (35 years)"),
 *         or an empty string if the input is invalid or empty.
 */
std::string calculate_age_from_birthdate(const std::string& birthDateString);