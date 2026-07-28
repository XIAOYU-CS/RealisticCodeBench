#include <vector>
#include <cstdint>

std::vector<bool> check_xor_constraints(const std::vector<std::vector<int>>& data,
const std::vector<std::vector<int>>& xor_groups,
const std::vector<int>& target_values) {
    size_t n_rows = data.size();
    std::vector<bool> results(n_rows, true);

    for (size_t i = 0; i < xor_groups.size(); ++i) {
        const auto& group = xor_groups[i];
        int target = target_values[i];

        if (group.empty()) {
            continue;
        }

        std::vector<int> xor_result(n_rows);
        for (size_t j = 0; j < n_rows; ++j) {
            xor_result[j] = data[j][group[0]];
        }

        for (size_t k = 1; k < group.size(); ++k) {
            for (size_t j = 0; j < n_rows; ++j) {
                xor_result[j] ^= data[j][group[k]];
            }
        }

        for (size_t j = 0; j < n_rows; ++j) {
            results[j] = results[j] && (xor_result[j] == target);
        }
    }

    return results;
}
