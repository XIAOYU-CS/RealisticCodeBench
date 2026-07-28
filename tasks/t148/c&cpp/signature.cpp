/**
 * @brief Removes elements from an array based on specified criteria.
 *
 * @tparam T The type of elements stored in the array
 * @param[in] array The array to remove elements from
 * @param[in] element The element to be removed
 * @param[in] mode Removal mode: "first", "all", or "limit" (default: "first")
 * @param[in] limit Number of elements to remove when mode is "limit" (default: 1)
 * @param[in] useStrict Whether to use strict equality (==) or loose equality (default: true)
 * @return A new vector with specified elements removed
 */
template<typename T>
std::vector<T> removeElements(const std::vector<T>& array,
                             const T& element,
                             const std::string& mode = "first",
                             double limit = 1,
                             bool useStrict = true);
