/**
 * @brief Generates the Cartesian product of all value vectors in the input map.
 *
 * Given a map where each key maps to a vector of integers, this function computes
 * all possible combinations by selecting one element from each vector (in the
 * order of the map's keys). The result is a list of these combinations.
 *
 * @param[in] inputMap A map with string keys and integer vector values.
 * @return A vector of vectors, where each inner vector represents one unique
 *         combination from the Cartesian product of the input vectors.
 */
std::vector<std::vector<int>> map_values_to_combinations(const std::map<std::string, std::vector<int>>& inputMap);