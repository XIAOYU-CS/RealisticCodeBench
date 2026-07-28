/**
 * @brief Finds the smallest single-letter string in a sorted array that is strictly greater than the target.
 *
 * Each string in @p letters and @p target must be exactly one lowercase letter (e.g., "a", "b", ..., "z").
 * The array is assumed to be sorted lexicographically (which matches alphabetical order for single letters).
 * Wrap-around is applied if no letter is greater than the target.
 *
 * @param[in] letters A sorted vector of single-character strings (e.g., {"a", "b", "c"}).
 * @param[in] target A single-character string (e.g., "m").
 * @return The smallest string in @p letters greater than @p target, or the first string if wrap-around occurs.
 */
std::string find_smallest_letter_greater_than_target(const std::vector<std::string>& letters, const std::string& target);