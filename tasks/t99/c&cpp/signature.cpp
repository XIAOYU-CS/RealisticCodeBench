#include <array>
#include <string>

using Matrix4d = std::array<std::array<double, 4>, 4>;

/**
 * @brief Create a pose matrix representing a rotation about a given axis.
 *
 * @param angle_deg Rotation angle in degrees.
 * @param axis Axis to rotate about, must be one of 'X', 'Y', or 'Z'.
 * @return Matrix4d 4x4 pose matrix representing the rotation.
 */
Matrix4d build_deg_based_rotation_pose_matrix(double angle_deg, const std::string& axis);
