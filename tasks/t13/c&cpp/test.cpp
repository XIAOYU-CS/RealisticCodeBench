#include <algorithm>
#include <chrono>
#include <filesystem>
#include <fstream>
#include <stdexcept>
#include <string>

namespace {
struct TempFiles {
    std::filesystem::path dir;
    std::filesystem::path file1;
    std::filesystem::path file2;

    TempFiles()
        : dir(std::filesystem::temp_directory_path() /
              ("t13_compare_files_" + std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()))),
          file1(dir / "file1.txt"),
          file2(dir / "file2.txt") {
        std::filesystem::create_directories(dir);
    }

    ~TempFiles() {
        std::filesystem::remove_all(dir);
    }
};

void write_file(const std::filesystem::path& path, const std::string& content) {
    std::ofstream file(path);
    file << content;
}
}

TEST_CASE("Test Compare Files") {
    TempFiles files;

    SECTION("Identical Files") {
        write_file(files.file1, "Line1\nLine2\nLine3\n");
        write_file(files.file2, "Line1\nLine2\nLine3\n");

        REQUIRE(compare_files(files.file1.string(), files.file2.string()).empty());
    }

    SECTION("Files with Differences") {
        write_file(files.file1, "Line1\nLine2\nLine3\n");
        write_file(files.file2, "Line1\nLineChanged\nLine3\n");

        auto result = compare_files(files.file1.string(), files.file2.string());
        REQUIRE_FALSE(result.empty());
        REQUIRE(result[0] == "--- " + files.file1.string() + "\n");
        REQUIRE(result[1] == "+++ " + files.file2.string() + "\n");
        REQUIRE(std::find(result.begin(), result.end(), "-Line2\n") != result.end());
        REQUIRE(std::find(result.begin(), result.end(), "+LineChanged\n") != result.end());
    }

    SECTION("Empty Files") {
        write_file(files.file1, "");
        write_file(files.file2, "");

        REQUIRE(compare_files(files.file1.string(), files.file2.string()).empty());
    }

    SECTION("Added Line") {
        write_file(files.file1, "Line1\n");
        write_file(files.file2, "Line1\nLine2\n");

        auto result = compare_files(files.file1.string(), files.file2.string());
        REQUIRE(std::find(result.begin(), result.end(), "+Line2\n") != result.end());
    }

    SECTION("Nonexistent File") {
        write_file(files.file2, "Line1\n");

        REQUIRE_THROWS_AS(compare_files((files.dir / "missing.txt").string(), files.file2.string()), std::runtime_error);
    }
}
