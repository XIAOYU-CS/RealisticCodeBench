#include <chrono>
#include <cstdlib>
#include <cstdint>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <iterator>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace fs = std::filesystem;

#ifndef T376_IMAGE_RESIZE_PARAMS_HPP
#define T376_IMAGE_RESIZE_PARAMS_HPP
struct ImageResizeParams {
    int quality;
    int target_width;
    int target_height;
    bool optimize_jpeg;
    bool progressive_jpeg;

    ImageResizeParams(int quality = 80, std::pair<int, int> target_size = {0, 0},
                     bool optimize_jpeg = false, bool progressive_jpeg = false)
        : quality(quality), target_width(target_size.first), target_height(target_size.second),
          optimize_jpeg(optimize_jpeg), progressive_jpeg(progressive_jpeg) {}
};
#endif

namespace {
std::string quote_shell_arg(const std::string& value) {
    std::string quoted = "'";
    for (char c : value) {
        quoted += c == '\'' ? "'\"'\"'" : std::string(1, c);
    }
    quoted += "'";
    return quoted;
}

struct TempFiles {
    fs::path input;
    fs::path output;
    fs::path script;

    ~TempFiles() {
        std::error_code ignored;
        fs::remove(input, ignored);
        fs::remove(output, ignored);
        fs::remove(script, ignored);
    }
};

std::vector<uint8_t> read_binary_file(const fs::path& path) {
    std::ifstream stream(path, std::ios::binary);
    if (!stream) {
        throw std::runtime_error("unable to read resized image");
    }

    return {std::istreambuf_iterator<char>(stream), std::istreambuf_iterator<char>()};
}

void write_binary_file(const fs::path& path, const std::vector<uint8_t>& bytes) {
    std::ofstream stream(path, std::ios::binary);
    if (!stream) {
        throw std::runtime_error("unable to write input image");
    }
    stream.write(reinterpret_cast<const char*>(bytes.data()), static_cast<std::streamsize>(bytes.size()));
}

void write_resize_script(const fs::path& path) {
    static const char* script = R"PY(
import sys
from PIL import Image

input_path, output_path = sys.argv[1], sys.argv[2]
quality = int(sys.argv[3])
width = int(sys.argv[4])
height = int(sys.argv[5])
optimize = sys.argv[6] == "1"
progressive = sys.argv[7] == "1"

with Image.open(input_path) as img:
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        alpha = img.split()[-1] if img.mode in ("RGBA", "LA") else img.convert("RGBA").split()[-1]
        background = Image.new("RGB", img.size, (255, 255, 255))
        background.paste(img.convert("RGB"), mask=alpha)
        img = background
    elif img.mode not in ("RGB", "L"):
        img = img.convert("RGB")

    resampling = getattr(getattr(Image, "Resampling", Image), "LANCZOS")
    resized = img.resize((width, height), resampling)
    resized.save(
        output_path,
        format="JPEG",
        quality=quality,
        optimize=optimize,
        progressive=progressive,
        subsampling="4:4:4",
    )
)PY";

    std::ofstream stream(path);
    if (!stream) {
        throw std::runtime_error("unable to write resize helper");
    }
    stream << script;
}
}

std::vector<uint8_t> resize_image(const std::vector<uint8_t>& image_bytes, const ImageResizeParams& params) {
    if (params.target_width <= 0 || params.target_height <= 0) {
        throw std::invalid_argument("Target width and height must be positive values");
    }

    if (params.quality < 1 || params.quality > 100) {
        throw std::invalid_argument("Image quality must be between 1 and 100");
    }

    try {
        const auto token = std::to_string(std::chrono::high_resolution_clock::now().time_since_epoch().count()) +
                           "_" + std::to_string(reinterpret_cast<std::uintptr_t>(&params));
        TempFiles temp{
            fs::temp_directory_path() / ("resize_image_" + token + ".input"),
            fs::temp_directory_path() / ("resize_image_" + token + ".jpg"),
            fs::temp_directory_path() / ("resize_image_" + token + ".py"),
        };

        write_binary_file(temp.input, image_bytes);
        write_resize_script(temp.script);

        std::cout << "\r" << std::string(80, ' ') << "\r";
        std::cout << "Quality: " << params.quality << "% | Resizing to: "
                  << params.target_width << "x" << params.target_height
                  << (params.optimize_jpeg ? " | Optimized" : "")
                  << (params.progressive_jpeg ? " | Progressive" : "") << std::flush;

        const std::string command =
            "python3 " + quote_shell_arg(temp.script.string()) + " " +
            quote_shell_arg(temp.input.string()) + " " +
            quote_shell_arg(temp.output.string()) + " " +
            std::to_string(params.quality) + " " +
            std::to_string(params.target_width) + " " +
            std::to_string(params.target_height) + " " +
            (params.optimize_jpeg ? "1" : "0") + " " +
            (params.progressive_jpeg ? "1" : "0");

        if (std::system(command.c_str()) != 0) {
            throw std::runtime_error("resize helper failed");
        }

        auto result = read_binary_file(temp.output);
        if (result.empty()) {
            throw std::runtime_error("resize helper produced no output");
        }
        return result;
    } catch (const std::exception& e) {
        throw std::runtime_error(std::string("Image processing failed: ") + e.what());
    }
}
