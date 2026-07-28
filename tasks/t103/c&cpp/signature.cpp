#include <vector>

/**
 * Given an affine transformation matrix, return the corresponding rotation angle in radians.
 *
 * @param matrix A 2D affine transformation matrix.
 * @return The rotation angle in radians, extracted from the affine matrix.
 */
double extract_rotation_angle_from_matrix(const std::vector<std::vector<double>>& matrix);
