/**
 * @brief Checks whether a string represents a valid latitude or longitude value.
 *
 * The function validates that the input string is a decimal number within the
 * standard geographic coordinate ranges:
 * - **Latitude**:  between -90.0 and +90.0 (inclusive)
 * - **Longitude**: between -180.0 and +180.0 (inclusive)
 *
 *
 * @param[in] coord The coordinate string to validate (e.g., "-34.6", "118.25").
 * @return `true` if @p coord is a syntactically valid and numerically in-range
 *         geographic coordinate; `false` otherwise.
 */
bool is_valid_coordinate(const std::string& coord);