#include "signature.cpp"

// Function to extract the translation vector from a 3x3 affine transformation matrix
Vector2d extract_translation_from_matrix(const Matrix3d& matrix) {
    return {matrix[0][2], matrix[1][2]};
}
