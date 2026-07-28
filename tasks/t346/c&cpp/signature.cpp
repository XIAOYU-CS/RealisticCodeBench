#include <map>
#include <vector>

/**
 * @brief Build a lookup table by processing position chunks to generate key-value mappings.
 *
 * @param pos1_chunk Collection of position chunks, each containing a sequence of indices.
 * @param initial_value Initial calculation value (originally A_initial).
 * @param flags Flag array that determines whether to use basis or inv_basis.
 * @param basis Array of basis elements.
 * @param inv_basis Array of inverse basis elements.
 * @param modulus Positive modulus value.
 * @return Lookup table with calculation results as keys and position chunks as values.
 * @throws std::invalid_argument when input data is invalid.
 * @throws std::out_of_range when an index is outside the vector bounds.
 */
std::map<int, std::vector<int>> build_table_task(
    const std::vector<std::vector<int>>& pos1_chunk,
    int initial_value,
    const std::vector<int>& flags,
    const std::vector<int>& basis,
    const std::vector<int>& inv_basis,
    int modulus
);
