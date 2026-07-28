
#include <map>
#include <stdexcept>
#include <vector>

std::map<int, std::vector<int>> build_table_task(
    const std::vector<std::vector<int>>& pos1_chunk,
    int initial_value,
    const std::vector<int>& flags,
    const std::vector<int>& basis,
    const std::vector<int>& inv_basis,
    int modulus) {

    if (modulus <= 0) {
        throw std::invalid_argument("modulus must be a positive integer");
    }
    if (flags.empty() && basis.empty() && inv_basis.empty()) {
        throw std::invalid_argument("flags, basis, and inv_basis cannot all be empty");
    }

    std::map<int, std::vector<int>> table_chunk;
    for (const auto& pos1 : pos1_chunk) {
        for (int idx : pos1) {
            if (idx < 0 ||
                static_cast<size_t>(idx) >= flags.size() ||
                static_cast<size_t>(idx) >= basis.size() ||
                static_cast<size_t>(idx) >= inv_basis.size()) {
                throw std::out_of_range("Index is out of valid range");
            }
        }

        int lhs = initial_value;
        for (int idx : pos1) {
            if (flags[idx] == 1) {
                lhs = static_cast<int>((static_cast<long long>(lhs) * inv_basis[idx]) % modulus);
            } else {
                lhs = static_cast<int>((static_cast<long long>(lhs) * basis[idx]) % modulus);
            }
        }

        table_chunk[lhs] = pos1;
    }

    return table_chunk;
}
