#include <array>
#include <vector>

#ifndef T27_CHANGE_REFERENCE_FRAME_TYPES
#define T27_CHANGE_REFERENCE_FRAME_TYPES
using Point3D = std::array<double, 3>;
using PointCloud = std::vector<Point3D>;
#endif

PointCloud changeReferenceFrame(
    const PointCloud &pointCloud,
    const std::vector<Point3D> &refFramePoints);
