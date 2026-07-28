#include <vector>
#include <tuple>
#include <stdexcept>
#include <cstdint>
#include <string>

std::vector<std::tuple<float, float, float>> opc_data_to_pixels(const std::vector<uint8_t>& data, const std::string& format = "rgb", bool normalize = false) {
    std::vector<std::tuple<float, float, float>> pixels;
    int bytes_per_pixel = (format == "rgba") ? 4 : 3;

    int pixel_count = data.size() / bytes_per_pixel;

    for (int i = 0; i < pixel_count; ++i) {
        int start = i * bytes_per_pixel;
        std::tuple<float, float, float> color;

        if (format == "rgb") {
            color = std::make_tuple(data[start], data[start + 1], data[start + 2]);
        } else if (format == "rgba") {
            color = std::make_tuple(data[start], data[start + 1], data[start + 2]);
        } else if (format == "grb") {
            color = std::make_tuple(data[start + 1], data[start], data[start + 2]);
        } else if (format == "bgr") {
            color = std::make_tuple(data[start + 2], data[start + 1], data[start]);
        } else {
            throw std::invalid_argument("Unsupported color format: " + format);
        }

        if (normalize) {
            color = std::make_tuple(
                std::get<0>(color) / 255.0f,
                std::get<1>(color) / 255.0f,
                std::get<2>(color) / 255.0f
            );
        }

        pixels.push_back(color);
    }

    return pixels;
}
