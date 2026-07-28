#include <cmath>
#include <stdexcept>
#include <vector>

// Function to calculate the rotation angle from a 3x3 affine transformation matrix
double extract_rotation_angle_from_matrix(const std::vector<std::vector<double>>& matrix) {
    if (matrix.size() != 3) {
        throw std::invalid_argument("Input must be a 3x3 affine transformation matrix.");
    }
    for (const auto& row : matrix) {
        if (row.size() != 3) {
            throw std::invalid_argument("Input must be a 3x3 affine transformation matrix.");
        }
    }

    return std::atan2(matrix[1][0], matrix[0][0]);
}
