#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

vector<vector<double>> n_linear_interp(const vector<vector<double>>& x,
                                      const vector<vector<double>>& voxel_min,
                                      const vector<vector<double>>& voxel_max,
                                      const vector<vector<vector<double>>>& vertex_embeds,
                                      int dim) {
    size_t batch_size = x.size();
    size_t num_features = vertex_embeds[0][0].size();
    
    vector<vector<double>> voxel_size(batch_size, vector<double>(dim));
    vector<vector<double>> safe_size(batch_size, vector<double>(dim));
    vector<vector<double>> weights(batch_size, vector<double>(dim));
    
    for (size_t i = 0; i < batch_size; ++i) {
        for (int j = 0; j < dim; ++j) {
            voxel_size[i][j] = voxel_max[i][j] - voxel_min[i][j];
            safe_size[i][j] = (voxel_size[i][j] == 0) ? 1e-12 : voxel_size[i][j];
            weights[i][j] = (x[i][j] - voxel_min[i][j]) / safe_size[i][j];
            weights[i][j] = max(0.0, min(1.0, weights[i][j]));
        }
    }
    
    vector<vector<vector<double>>> current_embeds = vertex_embeds;
    
    for (int i = 0; i < dim; ++i) {
        size_t group_size = current_embeds[0].size() / 2;
        vector<vector<vector<double>>> group0(batch_size, vector<vector<double>>(group_size, vector<double>(num_features)));
        vector<vector<vector<double>>> group1(batch_size, vector<vector<double>>(group_size, vector<double>(num_features)));
        
        for (size_t j = 0; j < batch_size; ++j) {
            for (size_t k = 0; k < group_size; ++k) {
                for (size_t l = 0; l < num_features; ++l) {
                    group0[j][k][l] = current_embeds[j][k][l];
                    group1[j][k][l] = current_embeds[j][k + group_size][l];
                }
            }
        }
        
        for (size_t j = 0; j < batch_size; ++j) {
            double w = weights[j][i];
            for (size_t k = 0; k < group_size; ++k) {
                for (size_t l = 0; l < num_features; ++l) {
                    current_embeds[j][k][l] = group0[j][k][l] * (1 - w) + group1[j][k][l] * w;
                }
            }
        }
        
        vector<vector<vector<double>>> next_embeds(
            batch_size,
            vector<vector<double>>(group_size, vector<double>(num_features))
        );
        for (size_t j = 0; j < batch_size; ++j) {
            for (size_t k = 0; k < group_size; ++k) {
                for (size_t l = 0; l < num_features; ++l) {
                    next_embeds[j][k][l] = current_embeds[j][k][l];
                }
            }
        }
        current_embeds = next_embeds;
    }
    
    vector<vector<double>> result(batch_size, vector<double>(num_features));
    for (size_t i = 0; i < batch_size; ++i) {
        for (size_t j = 0; j < num_features; ++j) {
            result[i][j] = current_embeds[i][0][j];
        }
    }
    
    return result;
}

vector<vector<double>> quadrilinear_interp(const vector<vector<double>>& x,
                                          const vector<vector<double>>& voxel_min_vertex,
                                          const vector<vector<double>>& voxel_max_vertex,
                                          const vector<vector<vector<double>>>& voxel_embedds) {
    return n_linear_interp(x, voxel_min_vertex, voxel_max_vertex, voxel_embedds, 4);
}
