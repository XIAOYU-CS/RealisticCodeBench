#include <vector>

std::vector<std::vector<double>> apply_shear_x(const std::vector<std::vector<double>>& matrix, double shearFactor) {
    auto result = matrix;
    for (auto& row : result) {
        if (row.size() >= 2) {
            row[1] = row[0] * shearFactor + row[1];
        }
    }
    return result;
}
