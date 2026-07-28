#include <vector>

std::vector<std::vector<double>> n_linear_interp(
    const std::vector<std::vector<double>>& x,
    const std::vector<std::vector<double>>& voxel_min,
    const std::vector<std::vector<double>>& voxel_max,
    const std::vector<std::vector<std::vector<double>>>& vertex_embeds,
    int dim
);

std::vector<std::vector<double>> quadrilinear_interp(
    const std::vector<std::vector<double>>& x,
    const std::vector<std::vector<double>>& voxel_min_vertex,
    const std::vector<std::vector<double>>& voxel_max_vertex,
    const std::vector<std::vector<std::vector<double>>>& voxel_embedds
);
