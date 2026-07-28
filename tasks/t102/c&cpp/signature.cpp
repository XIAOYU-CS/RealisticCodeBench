#include <vector>

/**
 * @brief Applies a shear transformation to a 2D matrix along the x-axis.
 *
 * @param matrix A 2D matrix represented as rows of doubles.
 * @param shear_factor The factor by which the matrix is sheared along the x-axis.
 * @return std::vector<std::vector<double>> The sheared matrix.
 */
std::vector<std::vector<double>> apply_shear_x(const std::vector<std::vector<double>>& matrix, double shearFactor);
