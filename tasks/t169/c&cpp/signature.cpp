/**
 * @brief Randomly shuffles the elements of the input vector in place.
 *
 * @param array The vector of integers to shuffle. Passed by non-const reference to allow in-place modification.
 * @return A reference to the shuffled vector (same object as @p array, for convenience).
 */
std::vector<int>& randomize_array_order(std::vector<int>& array);