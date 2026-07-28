/**
 * @brief Safely performs an immutable "splice"-like operation on a vector of integers.
 *
 * @param inputArray     The source vector to operate on.
 * @param amountToRemove The number of elements to remove (must be non-negative).
 * @param indexToRemove  The starting index from which to remove elements.
 *                       Negative indices are not supported; index must be in [0, inputArray.size()].
 * @param replaceWith    Optional element to insert in place of the removed elements.
 *                       If provided, exactly one element is inserted regardless of @p amountToRemove.
 * @return A new @c std::vector<int> reflecting the splice operation.
 */
std::vector<int> immutable_splice_array(
    const std::vector<int>& inputArray,
    int amountToRemove,
    int indexToRemove,
    std::optional<int> replaceWith
);