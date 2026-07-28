#include <cmath>
#include <cstdint>
#include <stdexcept>
#include <vector>

struct KeyPoint {
    float x;
    float y;
};

class Frame {
public:
    explicit Frame(int num_keypoints) : N(num_keypoints), mbf(5000.0f) {
        mvKeys.resize(N);
        mvKeysUn.resize(N);
        mvDepth.assign(N, -1.0f);
        mvuRight.assign(N, -1.0f);
    }

    void compute_stereo_from_rgbd(const std::vector<std::vector<float>>& depth_map) {
        compute_depth(depth_map, 1.0f);
    }

    void compute_stereo_from_rgbd(const std::vector<std::vector<uint16_t>>& depth_map) {
        compute_depth(depth_map, 0.001f);
    }

    template <typename T>
    void compute_stereo_from_rgbd(const std::vector<std::vector<T>>&) {
        throw std::invalid_argument("Unsupported depth image type. Supported types: float32, uint16");
    }

    int N;
    float mbf;
    std::vector<KeyPoint> mvKeys;
    std::vector<KeyPoint> mvKeysUn;
    std::vector<float> mvDepth;
    std::vector<float> mvuRight;

private:
    template <typename T>
    void compute_depth(const std::vector<std::vector<T>>& depth_map, float scale) {
        if (depth_map.empty() || depth_map.front().empty()) {
            throw std::invalid_argument("Input depth image is empty");
        }

        mvDepth.assign(N, -1.0f);
        mvuRight.assign(N, -1.0f);

        for (int i = 0; i < N; ++i) {
            const int u = static_cast<int>(std::round(mvKeys[i].x));
            const int v = static_cast<int>(std::round(mvKeys[i].y));
            if (v < 0 || v >= static_cast<int>(depth_map.size())) {
                continue;
            }

            const auto& row = depth_map[v];
            if (u < 0 || u >= static_cast<int>(row.size())) {
                continue;
            }

            const float d = static_cast<float>(row[u]) * scale;
            if (d > 0.0f) {
                mvDepth[i] = d;
                mvuRight[i] = mvKeysUn[i].x - mbf / d;
            }
        }
    }
};
