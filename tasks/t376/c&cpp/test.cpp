#include <cstdint>
#include <stdexcept>
#include <utility>
#include <vector>

namespace {
std::vector<uint8_t> sample_jpeg() {
    return {
        255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 0, 0, 1,
        0, 1, 0, 0, 255, 219, 0, 67, 0, 5, 3, 4, 4, 4, 3, 5,
        4, 4, 4, 5, 5, 5, 6, 7, 12, 8, 7, 7, 7, 7, 15, 11,
        11, 9, 12, 17, 15, 18, 18, 17, 15, 17, 17, 19, 22, 28, 23, 19,
        20, 26, 21, 17, 17, 24, 33, 24, 26, 29, 29, 31, 31, 31, 19, 23,
        34, 36, 34, 30, 36, 28, 30, 31, 30, 255, 219, 0, 67, 1, 5, 5,
        5, 7, 6, 7, 14, 8, 8, 14, 30, 20, 17, 20, 30, 30, 30, 30,
        30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
        30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 255, 192,
        0, 17, 8, 0, 24, 0, 32, 3, 1, 17, 0, 2, 17, 1, 3, 17,
        1, 255, 196, 0, 31, 0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 255, 196, 0, 181, 16, 0, 2, 1, 3, 3, 2, 4, 3, 5,
        5, 4, 4, 0, 0, 1, 125, 1, 2, 3, 0, 4, 17, 5, 18, 33,
        49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35,
        66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23,
        24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58,
        67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90,
        99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122,
        131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153,
        154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183,
        184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213,
        214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241,
        242, 243, 244, 245, 246, 247, 248, 249, 250, 255, 196, 0, 31, 1, 0, 3,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
        2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 255, 196, 0, 181, 17, 0,
        2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119, 0,
        1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19,
        34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21,
        98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39,
        40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73,
        74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105,
        106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136,
        137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166,
        167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196,
        197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226,
        227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249,
        250, 255, 218, 0, 12, 3, 1, 0, 2, 17, 3, 17, 0, 63, 0, 240,
        15, 15, 219, 125, 222, 43, 154, 190, 3, 200, 243, 233, 64, 244, 63, 15,
        219, 125, 222, 43, 199, 175, 128, 242, 61, 10, 80, 61, 19, 195, 246, 223,
        119, 138, 242, 43, 224, 60, 143, 66, 148, 15, 67, 240, 253, 183, 221, 226,
        188, 122, 248, 15, 35, 208, 165, 3, 228, 239, 15, 219, 125, 222, 43, 247,
        170, 248, 15, 35, 230, 105, 64, 244, 63, 15, 219, 125, 222, 43, 199, 175,
        128, 242, 61, 10, 80, 61, 15, 195, 246, 223, 119, 138, 242, 43, 224, 60,
        143, 66, 148, 14, 251, 76, 9, 105, 103, 45, 212, 138, 197, 33, 141, 164,
        96, 163, 146, 0, 201, 199, 229, 94, 92, 178, 215, 82, 106, 11, 118, 236,
        111, 137, 196, 67, 7, 134, 169, 137, 168, 155, 140, 34, 228, 237, 189, 146,
        187, 183, 153, 242, 159, 135, 237, 190, 239, 21, 251, 181, 124, 7, 145, 225,
        82, 129, 232, 126, 31, 182, 251, 188, 87, 145, 95, 1, 228, 122, 20, 160,
        122, 39, 135, 237, 190, 239, 21, 227, 215, 192, 121, 30, 133, 40, 22, 60,
        115, 170, 219, 89, 233, 246, 250, 96, 184, 136, 53, 195, 110, 152, 6, 12,
        193, 84, 240, 10, 224, 145, 147, 223, 143, 186, 69, 120, 180, 115, 76, 155,
        5, 82, 85, 113, 56, 136, 167, 23, 203, 101, 239, 53, 45, 111, 117, 27,
        181, 107, 89, 221, 105, 125, 117, 177, 249, 247, 137, 152, 250, 180, 240, 148,
        242, 250, 75, 90, 158, 244, 182, 248, 98, 213, 180, 125, 37, 45, 83, 186,
        248, 90, 215, 83, 255, 217};
}

struct JpegInfo {
    int width;
    int height;
    bool progressive;
};

JpegInfo read_jpeg_info(const std::vector<uint8_t>& bytes) {
    REQUIRE(bytes.size() > 4);
    REQUIRE(bytes[0] == 0xFF);
    REQUIRE(bytes[1] == 0xD8);
    REQUIRE(bytes[bytes.size() - 2] == 0xFF);
    REQUIRE(bytes[bytes.size() - 1] == 0xD9);

    for (size_t i = 2; i + 8 < bytes.size();) {
        if (bytes[i] != 0xFF) {
            ++i;
            continue;
        }
        while (i < bytes.size() && bytes[i] == 0xFF) {
            ++i;
        }
        if (i >= bytes.size()) {
            break;
        }

        const uint8_t marker = bytes[i++];
        if (marker == 0xD8 || marker == 0x01 || (marker >= 0xD0 && marker <= 0xD7)) {
            continue;
        }
        if (marker == 0xDA || marker == 0xD9 || i + 1 >= bytes.size()) {
            break;
        }

        const size_t length = (static_cast<size_t>(bytes[i]) << 8) | bytes[i + 1];
        REQUIRE(length >= 2);
        REQUIRE(i + length <= bytes.size());

        if (marker == 0xC0 || marker == 0xC2) {
            return {
                static_cast<int>((bytes[i + 5] << 8) | bytes[i + 6]),
                static_cast<int>((bytes[i + 3] << 8) | bytes[i + 4]),
                marker == 0xC2,
            };
        }

        i += length;
    }

    FAIL("JPEG dimensions were not found");
}
}

TEST_CASE("TestResizeImage") {
    const std::vector<uint8_t> test_image_bytes = sample_jpeg();

    SECTION("normal_resize") {
        ImageResizeParams params{80, {16, 12}, true};
        auto result = resize_image(test_image_bytes, params);
        auto info = read_jpeg_info(result);
        REQUIRE(info.width == 16);
        REQUIRE(info.height == 12);
        REQUIRE_FALSE(info.progressive);
    }

    SECTION("quality_parameter") {
        ImageResizeParams params_high{95, {16, 12}};
        ImageResizeParams params_low{10, {16, 12}};
        auto result_high = resize_image(test_image_bytes, params_high);
        auto result_low = resize_image(test_image_bytes, params_low);
        REQUIRE(result_high.size() > result_low.size());
    }

    SECTION("progressive_jpeg") {
        ImageResizeParams params_progressive{80, {16, 12}, false, true};
        ImageResizeParams params_standard{80, {16, 12}, false, false};
        auto result_progressive = resize_image(test_image_bytes, params_progressive);
        auto result_standard = resize_image(test_image_bytes, params_standard);
        REQUIRE(result_progressive != result_standard);
        REQUIRE(read_jpeg_info(result_progressive).progressive);
        REQUIRE_FALSE(read_jpeg_info(result_standard).progressive);
    }

    SECTION("invalid_dimensions") {
        ImageResizeParams params_zero{80, {0, 16}};
        REQUIRE_THROWS_AS(resize_image(test_image_bytes, params_zero), std::invalid_argument);

        ImageResizeParams params_negative{80, {16, -1}};
        REQUIRE_THROWS_AS(resize_image(test_image_bytes, params_negative), std::invalid_argument);
    }

    SECTION("quality_bounds_and_invalid_quality") {
        REQUIRE(read_jpeg_info(resize_image(test_image_bytes, ImageResizeParams{1, {8, 8}})).width == 8);
        REQUIRE(read_jpeg_info(resize_image(test_image_bytes, ImageResizeParams{100, {8, 8}})).height == 8);

        ImageResizeParams params_low{0, {16, 12}};
        REQUIRE_THROWS_AS(resize_image(test_image_bytes, params_low), std::invalid_argument);

        ImageResizeParams params_high{101, {16, 12}};
        REQUIRE_THROWS_AS(resize_image(test_image_bytes, params_high), std::invalid_argument);
    }

    SECTION("empty_image_bytes") {
        ImageResizeParams params{80, {16, 12}};
        REQUIRE_THROWS_AS(resize_image({}, params), std::runtime_error);
    }
}
