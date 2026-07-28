#include <cmath>
#include <vector>

// Function to rotate a point cloud around the Y-axis by a given angle
std::vector<std::vector<double>> rotate_point_cloud_around_y_axis(
    const std::vector<std::vector<double>>& pointCloud,
    double rotationAngle) {
    const double c = std::cos(rotationAngle);
    const double s = std::sin(rotationAngle);
    std::vector<std::vector<double>> rotated;
    rotated.reserve(pointCloud.size());

    for (const auto& point : pointCloud) {
        rotated.push_back({c * point[0] - s * point[2], point[1], s * point[0] + c * point[2]});
    }

    return rotated;
}
