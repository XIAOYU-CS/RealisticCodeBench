#include <filesystem>
#include <fstream>

namespace {
std::filesystem::path write_mapping_file(const std::string& name, const std::string& content) {
    auto path = std::filesystem::temp_directory_path() / name;
    std::ofstream file(path);
    file << content;
    return path;
}
}

TEST_CASE("Test load_regex_mappings_from_file function", "[load_regex_mappings_from_file]") {
    SECTION("Test with a valid mapping file content") {
        auto path = write_mapping_file("t55_valid_mapping.txt", "'old_pattern1','new_word1'\n'old_pattern2','new_word2'\n");
        std::vector<Mapping> result = load_regex_mappings_from_file(path.string());
        std::vector<Mapping> expected = {
            {std::regex("old_pattern1"), "new_word1"},
            {std::regex("old_pattern2"), "new_word2"}
        };

        REQUIRE(result.size() == expected.size());
        for (size_t i = 0; i < result.size(); ++i) {
            REQUIRE(result[i].pattern.mark_count() == expected[i].pattern.mark_count());
            REQUIRE(result[i].replacement == expected[i].replacement);
        }
        std::filesystem::remove(path);
    }

    SECTION("Test with a missing file") {
        auto path = std::filesystem::temp_directory_path() / "t55_missing_mapping.txt";
        std::filesystem::remove(path);
        REQUIRE_THROWS_AS(load_regex_mappings_from_file(path.string()), std::runtime_error);
    }

    SECTION("Test with a line that does not contain a comma") {
        auto path = write_mapping_file("t55_malformed_mapping.txt", "'old_pattern1' 'new_word1'\n");
        REQUIRE_THROWS_AS(load_regex_mappings_from_file(path.string()), std::runtime_error);
        std::filesystem::remove(path);
    }

    SECTION("Test with valid patterns that contain special regex characters") {
        auto path = write_mapping_file("t55_regex_mapping.txt", "'\\d+', 'number'\n'\\w+', 'word'\n");
        std::vector<Mapping> result = load_regex_mappings_from_file(path.string());
        std::vector<Mapping> expected = {
            {std::regex("\\d+"), "number"},
            {std::regex("\\w+"), "word"}
        };
        REQUIRE(result.size() == expected.size());
        for (size_t i = 0; i < result.size(); ++i) {
            REQUIRE(result[i].pattern.mark_count() == expected[i].pattern.mark_count());
            REQUIRE(result[i].replacement == expected[i].replacement);
        }
        std::filesystem::remove(path);
    }

    SECTION("Test with empty mapping file") {
        auto path = write_mapping_file("t55_empty_mapping.txt", "");
        REQUIRE(load_regex_mappings_from_file(path.string()).empty());
        std::filesystem::remove(path);
    }
}
