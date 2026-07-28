#include <array>
#include <cctype>
#include <cmath>
#include <stdexcept>
#include <string>

using Matrix4d = std::array<std::array<double, 4>, 4>;

Matrix4d build_deg_based_rotation_pose_matrix(double angleDeg, const std::string& axis) {
    double angleRad = angleDeg * M_PI / 180;
    Matrix4d mat = {{
        {{1, 0, 0, 0}},
        {{0, 1, 0, 0}},
        {{0, 0, 1, 0}},
        {{0, 0, 0, 1}},
    }};
    char axisChar = axis.empty() ? '\0' : static_cast<char>(std::tolower(axis[0]));

    if(axisChar == 'x') {
        mat[1][1] = cos(angleRad);
        mat[1][2] = -sin(angleRad);
        mat[2][1] = sin(angleRad);
        mat[2][2] = cos(angleRad);
    } else if(axisChar == 'y') {
        mat[0][0] = cos(angleRad);
        mat[0][2] = sin(angleRad);
        mat[2][0] = -sin(angleRad);
        mat[2][2] = cos(angleRad);
    } else if(axisChar == 'z') {
        mat[0][0] = cos(angleRad);
        mat[0][1] = -sin(angleRad);
        mat[1][0] = sin(angleRad);
        mat[1][1] = cos(angleRad);
    } else {
        throw std::invalid_argument("Invalid axis. Must be one of 'X', 'Y', or 'Z'.");
    }

    return mat;
}
