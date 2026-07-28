#include <array>
#include <cmath>
#include <utility>

using Matrix3d = std::array<std::array<double, 3>, 3>;

// Function to calculate the scaling factors from a 3x3 affine transformation matrix
std::pair<double, double> extract_scale_factors_from_matrix(const Matrix3d& matrix) {
    double scale_x = std::hypot(matrix[0][0], matrix[1][0]);
    double scale_y = std::hypot(matrix[0][1], matrix[1][1]);

    return std::make_pair(scale_x, scale_y);
}
