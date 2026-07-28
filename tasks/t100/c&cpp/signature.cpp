#include <array>

using Matrix3d = std::array<std::array<double, 3>, 3>;
using Vector2d = std::array<double, 2>;

/**
 * Given a 3x3 matrix, return the corresponding translation vector.
 *
 * @param matrix A 3x3 affine transformation matrix.
 * @return A 2-element array containing the translation components (translation_x, translation_y).
 */
Vector2d extract_translation_from_matrix(const Matrix3d& matrix);
