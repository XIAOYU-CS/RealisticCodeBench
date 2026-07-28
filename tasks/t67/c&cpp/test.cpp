#include <chrono>
#include <filesystem>
#include <fstream>
#include <limits>
#include <optional>

struct TempFile {
    std::filesystem::path path;

    explicit TempFile(const std::string& content)
        : path(std::filesystem::temp_directory_path() /
               ("t67-" + std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()) + ".txt")) {
        std::ofstream file(path);
        file << content;
    }

    ~TempFile() {
        std::filesystem::remove(path);
    }
};

TEST_CASE("get_min_seq_num_and_distance") {
    SECTION("basic functionality with expected input") {
        TempFile file("hello world\napple banana apple\norange apple banana");

        auto [line_number, distance] = get_min_seq_num_and_distance(file.path.string(), "apple", "banana");

        REQUIRE(line_number == std::optional<int>{2});
        REQUIRE(distance == 1);
    }

    SECTION("one or both words are not present") {
        TempFile file("apple orange pear\norange pear apple");

        auto [line_number, distance] = get_min_seq_num_and_distance(file.path.string(), "apple", "banana");

        REQUIRE_FALSE(line_number.has_value());
        REQUIRE(distance == std::numeric_limits<int>::max());
    }

    SECTION("empty file") {
        TempFile file("");

        auto [line_number, distance] = get_min_seq_num_and_distance(file.path.string(), "apple", "banana");

        REQUIRE_FALSE(line_number.has_value());
        REQUIRE(distance == std::numeric_limits<int>::max());
    }

    SECTION("multiple lines with varying distances between words") {
        TempFile file("apple banana\napple orange orange banana\napple orange orange orange banana");

        auto [line_number, distance] = get_min_seq_num_and_distance(file.path.string(), "apple", "banana");

        REQUIRE(line_number == std::optional<int>{1});
        REQUIRE(distance == 1);
    }

    SECTION("missing file returns infinite distance") {
        auto path = std::filesystem::temp_directory_path() /
                    ("missing-t67-" + std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()) + ".txt");

        auto [line_number, distance] = get_min_seq_num_and_distance(path.string(), "apple", "banana");

        REQUIRE_FALSE(line_number.has_value());
        REQUIRE(distance == std::numeric_limits<int>::max());
    }
}
