#include <algorithm>
#include <filesystem>
#include <fstream>
#include <string>

namespace fs = std::filesystem;

TEST_CASE("TestGetFotoFiles") {
    fs::path base_dir = fs::temp_directory_path() / "test_foto_files_t339";
    fs::path subdir = base_dir / "subdir";
    fs::path jpg_file = base_dir / "test.jpg";
    fs::path png_file = subdir / "image.PNG";
    fs::path txt_file = base_dir / "notes.txt";
    fs::path webp_file = subdir / "photo.webp";

    fs::remove_all(base_dir);
    fs::create_directories(subdir);
    std::ofstream(jpg_file) << "JPG content";
    std::ofstream(png_file) << "PNG content";
    std::ofstream(txt_file) << "Text content";
    std::ofstream(webp_file) << "WebP content";

    SECTION("default extensions") {
        auto results = get_foto_files(base_dir);
        REQUIRE(results.size() == 1);
        REQUIRE(std::find(results.begin(), results.end(), fs::canonical(jpg_file).string()) != results.end());
    }

    SECTION("custom extensions") {
        auto results = get_foto_files(base_dir, {".png", ".webp"});
        REQUIRE(results.size() == 2);
        REQUIRE(std::find(results.begin(), results.end(), fs::canonical(png_file).string()) != results.end());
        REQUIRE(std::find(results.begin(), results.end(), fs::canonical(webp_file).string()) != results.end());
    }

    SECTION("case insensitive") {
        auto results = get_foto_files(base_dir, {".png"});
        REQUIRE(results.size() == 1);
        REQUIRE(std::find(results.begin(), results.end(), fs::canonical(png_file).string()) != results.end());
    }

    SECTION("nonexistent directory") {
        REQUIRE_THROWS(get_foto_files("/this/directory/should/not/exist"));
    }

    SECTION("non directory path") {
        REQUIRE_THROWS(get_foto_files(jpg_file));
    }

    fs::remove_all(base_dir);
}
