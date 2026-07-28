#include <array>
#include <cmath>
#include <stdexcept>
#include <vector>

#ifndef T27_CHANGE_REFERENCE_FRAME_TYPES
#define T27_CHANGE_REFERENCE_FRAME_TYPES
using Point3D = std::array<double, 3>;
using PointCloud = std::vector<Point3D>;
#endif

namespace {
Point3D subtract(const Point3D &a, const Point3D &b) {
    return {a[0] - b[0], a[1] - b[1], a[2] - b[2]};
}

Point3D cross(const Point3D &a, const Point3D &b) {
    return {
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    };
}

Point3D normalize(const Point3D &p) {
    const double length = std::sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]);
    if (length == 0.0) {
        throw std::invalid_argument("reference frame points must not be collinear");
    }
    return {p[0] / length, p[1] / length, p[2] / length};
}
}

PointCloud changeReferenceFrame(
    const PointCloud &pointCloud,
    const std::vector<Point3D> &refFramePoints) {
    if (refFramePoints.size() != 3) {
        throw std::invalid_argument("reference frame requires exactly three points");
    }

    const Point3D &a = refFramePoints[0];
    const Point3D ab = subtract(refFramePoints[1], a);
    const Point3D ac = subtract(refFramePoints[2], a);

    const Point3D u = normalize(ab);
    const Point3D w = normalize(cross(ab, ac));
    const Point3D v = normalize(cross(w, ab));

    PointCloud transformed;
    transformed.reserve(pointCloud.size());
    for (const Point3D &point : pointCloud) {
        const Point3D q = subtract(point, a);
        transformed.push_back({
            u[0] * q[0] + v[0] * q[1] + w[0] * q[2],
            u[1] * q[0] + v[1] * q[1] + w[1] * q[2],
            u[2] * q[0] + v[2] * q[1] + w[2] * q[2],
        });
    }
    return transformed;
}
