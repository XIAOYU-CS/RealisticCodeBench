/**
 * @brief Modifies an ABC notation string by inserting or replacing a clef specification in the K: (key) line.
 *
 * @param abc The input ABC notation string to modify.
 * @param clef The clef to insert or set in the K: line (e.g., "treble", "bass", "alto"). Defaults to "bass".
 * @return The modified ABC notation string with the updated clef in the K: line.
 *
 * @note If the input string contains multiple K: lines, only the first one is modified.
 * @note If no K: line is found, the behavior is implementation-defined (e.g., may return the original string unchanged).
 */
std::string modify_abc_clef(const std::string& abc, const std::string& clef = "bass");