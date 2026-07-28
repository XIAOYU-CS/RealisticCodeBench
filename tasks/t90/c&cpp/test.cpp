#include <filesystem>
#include <fstream>

namespace {
std::string writeBibFile(const std::string& content) {
    const auto path = std::filesystem::temp_directory_path() / "t90_extract_bib_info_test.bib";
    std::ofstream file(path);
    file << content;
    return path.string();
}
}

TEST_CASE("extractBibInfo parses simple BibTeX fields", "[extractBibInfo]") {
    SECTION("valid entry") {
        const auto path = writeBibFile("@article{sample2024,\n  author = {John Doe and Jane Smith},\n  title = {A Comprehensive Study on AI},\n  year = {2024}\n}");
        const std::vector<std::map<std::string, std::string>> expected = {
            {{"title", "A Comprehensive Study on AI"}, {"author", "John Doe and Jane Smith"}, {"year", "2024"}}
        };
        REQUIRE(extractBibInfo(path) == expected);
        std::filesystem::remove(path);
    }

    SECTION("multiple entries") {
        const auto path = writeBibFile("@article{sample2024,\n  author = {John Doe},\n  title = {A Comprehensive Study on AI},\n  year = {2024}\n}\n@article{sample2023,\n  author = {Jane Smith},\n  title = {Deep Learning Techniques},\n  year = {2023}\n}");
        const std::vector<std::map<std::string, std::string>> expected = {
            {{"title", "A Comprehensive Study on AI"}, {"author", "John Doe"}, {"year", "2024"}},
            {{"title", "Deep Learning Techniques"}, {"author", "Jane Smith"}, {"year", "2023"}}
        };
        REQUIRE(extractBibInfo(path) == expected);
        std::filesystem::remove(path);
    }

    SECTION("missing year") {
        const auto path = writeBibFile("@article{sample2024,\n  author = {John Doe},\n  title = {Title Missing Year}\n}");
        const std::vector<std::map<std::string, std::string>> expected = {
            {{"title", "Title Missing Year"}, {"author", "John Doe"}, {"year", ""}}
        };
        REQUIRE(extractBibInfo(path) == expected);
        std::filesystem::remove(path);
    }

    SECTION("empty file") {
        const auto path = writeBibFile("");
        REQUIRE(extractBibInfo(path).empty());
        std::filesystem::remove(path);
    }

    SECTION("badly formatted entry") {
        const auto path = writeBibFile("@article{sample2024,\n  author = John Doe,\n  title = {Title Without Braces},\n  year = 2024\n}");
        const std::vector<std::map<std::string, std::string>> expected = {
            {{"title", "Title Without Braces"}, {"author", ""}, {"year", ""}}
        };
        REQUIRE(extractBibInfo(path) == expected);
        std::filesystem::remove(path);
    }
}
