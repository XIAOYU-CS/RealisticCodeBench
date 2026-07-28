/**
* Convert Euler angles (roll, pitch, yaw) to a rotation matrix.
*
* @param roll The rotation around the x-axis in degrees.
* @param pitch The rotation around the y-axis in degrees.
* @param yaw The rotation around the z-axis in degrees.
*
* @return A 3x3 rotation matrix.
*/
#include <array>

using Matrix3f = std::array<std::array<float, 3>, 3>;

Matrix3f euler_to_rotation_matrix(float roll, float pitch, float yaw);
