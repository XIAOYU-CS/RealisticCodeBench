#include <filesystem>
#include <fstream>
#include <cstdlib>
#include <string>

namespace fs = std::filesystem;

struct TempDir {
    fs::path path = fs::temp_directory_path() / fs::path("t58-cpp-" + std::to_string(std::rand()));

    TempDir() {
        fs::remove_all(path);
        fs::create_directories(path);
    }

    ~TempDir() {
        fs::remove_all(path);
    }
};

static bool is_empty_dir(const fs::path& path) {
    return fs::directory_iterator(path) == fs::directory_iterator();
}

TEST_CASE("Empty Directory", "[empty_directory]") {
    SECTION("Non-existent directory") {
        REQUIRE_THROWS_AS(empty_directory("/path/to/nonexistent/directory"), std::invalid_argument);
    }

    SECTION("Non-directory path") {
        TempDir dir;
        fs::path file = dir.path / "file.txt";
        std::ofstream(file) << "data";

        REQUIRE_THROWS_AS(empty_directory(file.string()), std::invalid_argument);
        REQUIRE(fs::exists(file));
    }

    SECTION("Empty directory") {
        TempDir dir;

        empty_directory(dir.path.string());

        REQUIRE(is_empty_dir(dir.path));
    }

    SECTION("Directory with files") {
        TempDir dir;
        std::ofstream(dir.path / "file1.txt") << "one";
        std::ofstream(dir.path / "file2.txt") << "two";

        empty_directory(dir.path.string());

        REQUIRE(is_empty_dir(dir.path));
    }

    SECTION("Directory with subdirectories") {
        TempDir dir;
        fs::create_directories(dir.path / "subdir");
        std::ofstream(dir.path / "subdir" / "file.txt") << "nested";

        empty_directory(dir.path.string());

        REQUIRE(is_empty_dir(dir.path));
    }
}
