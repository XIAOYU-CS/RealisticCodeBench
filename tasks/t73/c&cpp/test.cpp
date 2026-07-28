#include <cstdio>
#include <fstream>
#include <string>
#include <vector>

static std::string write_pgm(const std::string& name, const std::vector<int>& pixels) {
    std::ofstream out(name);
    out << "P2\n4 4\n255\n";
    for (int pixel : pixels) {
        out << pixel << ' ';
    }
    return name;
}

TEST_CASE("TestConvertImageToBits", "[image]") {
    SECTION("All White Image") {
        std::string filename = write_pgm("all_white.pgm", std::vector<int>(16, 255));
        REQUIRE(image_to_1bit_binary_list(filename) == std::vector<int>(16, 1));
        std::remove(filename.c_str());
    }

    SECTION("All Black Image") {
        std::string filename = write_pgm("all_black.pgm", std::vector<int>(16, 0));
        REQUIRE(image_to_1bit_binary_list(filename) == std::vector<int>(16, 0));
        std::remove(filename.c_str());
    }

    SECTION("Checkerboard Image") {
        std::string filename = write_pgm("checkerboard.pgm", {
            255, 0, 255, 0,
            0, 255, 0, 255,
            255, 0, 255, 0,
            0, 255, 0, 255
        });
        REQUIRE(image_to_1bit_binary_list(filename) == std::vector<int>({
            1, 0, 1, 0,
            0, 1, 0, 1,
            1, 0, 1, 0,
            0, 1, 0, 1
        }));
        std::remove(filename.c_str());
    }

    SECTION("Horizontal Stripes Image") {
        std::string filename = write_pgm("horizontal_stripes.pgm", {
            255, 255, 255, 255,
            0, 0, 0, 0,
            255, 255, 255, 255,
            0, 0, 0, 0
        });
        REQUIRE(image_to_1bit_binary_list(filename) == std::vector<int>({
            1, 1, 1, 1,
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0
        }));
        std::remove(filename.c_str());
    }

    SECTION("Vertical Stripes Image") {
        std::string filename = write_pgm("vertical_stripes.pgm", {
            255, 0, 255, 0,
            255, 0, 255, 0,
            255, 0, 255, 0,
            255, 0, 255, 0
        });
        REQUIRE(image_to_1bit_binary_list(filename) == std::vector<int>({
            1, 0, 1, 0,
            1, 0, 1, 0,
            1, 0, 1, 0,
            1, 0, 1, 0
        }));
        std::remove(filename.c_str());
    }
}
