#include <array>
#include <cmath>

using Matrix3f = std::array<std::array<float, 3>, 3>;

// Function to convert Euler angles (roll, pitch, yaw) to a rotation matrix
Matrix3f euler_to_rotation_matrix(float roll, float pitch, float yaw) {
    constexpr double pi = 3.14159265358979323846;
    const double roll_rad = roll * pi / 180.0;
    const double pitch_rad = pitch * pi / 180.0;
    const double yaw_rad = yaw * pi / 180.0;

    const double sr = std::sin(roll_rad);
    const double cr = std::cos(roll_rad);
    const double sp = std::sin(pitch_rad);
    const double cp = std::cos(pitch_rad);
    const double sy = std::sin(yaw_rad);
    const double cy = std::cos(yaw_rad);

    return {{
        {static_cast<float>(cy * cp), static_cast<float>(cy * sp * sr - sy * cr), static_cast<float>(cy * sp * cr + sy * sr)},
        {static_cast<float>(sy * cp), static_cast<float>(sy * sp * sr + cy * cr), static_cast<float>(sy * sp * cr - cy * sr)},
        {static_cast<float>(-sp), static_cast<float>(cp * sr), static_cast<float>(cp * cr)}
    }};
}
