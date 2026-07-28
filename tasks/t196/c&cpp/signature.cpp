#include <vector>

/**
 * @brief Returns a new vector containing all elements from the input vector up to (but not including) the first null pointer.
 *
 * @param array The input vector of @c int* pointers to process.
 * @return A @c std::vector<int*> containing all elements before the first @c nullptr.
 */
std::vector<int*> elements_before_null(const std::vector<int*>& array);
