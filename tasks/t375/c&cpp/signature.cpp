#include <cstdint>
#include <vector>

struct KeyPoint {
    float x;
    float y;
};

class Frame {
public:
    explicit Frame(int num_keypoints);

    void compute_stereo_from_rgbd(const std::vector<std::vector<float>>& depth_map);
    void compute_stereo_from_rgbd(const std::vector<std::vector<uint16_t>>& depth_map);

    template <typename T>
    void compute_stereo_from_rgbd(const std::vector<std::vector<T>>& depth_map);

    int N;
    float mbf;
    std::vector<KeyPoint> mvKeys;
    std::vector<KeyPoint> mvKeysUn;
    std::vector<float> mvDepth;
    std::vector<float> mvuRight;
};
