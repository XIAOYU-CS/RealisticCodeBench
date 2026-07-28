#include <cstdint>
#include <utility>
#include <vector>

#ifndef T376_IMAGE_RESIZE_PARAMS_HPP
#define T376_IMAGE_RESIZE_PARAMS_HPP
struct ImageResizeParams {
    int quality;
    int target_width;
    int target_height;
    bool optimize_jpeg;
    bool progressive_jpeg;

    ImageResizeParams(int quality = 80,
                      std::pair<int, int> target_size = {0, 0},
                      bool optimize_jpeg = false,
                      bool progressive_jpeg = false)
        : quality(quality),
          target_width(target_size.first),
          target_height(target_size.second),
          optimize_jpeg(optimize_jpeg),
          progressive_jpeg(progressive_jpeg) {}
};
#endif

std::vector<uint8_t> resize_image(const std::vector<uint8_t>& image_bytes,
                                  const ImageResizeParams& params);
