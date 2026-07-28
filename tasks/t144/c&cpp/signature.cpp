/**
 * @brief Filters elements from a vector using a user-provided predicate function.
 *
 * @tparam T The type of elements stored in the vector.
 * @param unfilteredArray The input vector to be filtered.
 * @param isQualified A callable (e.g., function, lambda, functor) that takes a @c const T& and returns @c bool.
 *                    It should be free of side effects for predictable behavior.
 * @return A new @c std::vector<T> containing only the elements that satisfy the predicate.
 */
template <typename T, typename Predicate>
std::vector<T> filter_array(const std::vector<T>& unfilteredArray, Predicate isQualified);
