#include <algorithm>
#include <cctype>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

namespace fs = std::filesystem;

TEST_CASE("TestCommandLS") {
    struct TestFixture {
        fs::path temp_dir;
        fs::path file1;
        fs::path file2;
        fs::path dir1;

        TestFixture() {
            temp_dir = fs::temp_directory_path() / "test_ls_temp";
            fs::remove_all(temp_dir);
            fs::create_directory(temp_dir);

            file1 = temp_dir / "aaa.txt";
            file2 = temp_dir / "zzz.txt";
            dir1 = temp_dir / "bbb_dir";

            std::ofstream(file1) << std::string(100, 'A');
            std::ofstream(file2) << std::string(50, 'B');
            fs::create_directory(dir1);
        }

        ~TestFixture() {
            fs::remove_all(temp_dir);
        }
    };

    TestFixture fixture;

    SECTION("Test listing current directory when no directory is specified") {
        auto [success, result] = command_ls();
        REQUIRE(success);
        REQUIRE(result.find('\n') != std::string::npos);
    }

    SECTION("Test listing specific directory sorted by name") {
        auto [success, result] = command_ls(fixture.temp_dir.string(), "name");
        REQUIRE(success);
        REQUIRE(result.find("aaa.txt") != std::string::npos);
        REQUIRE(result.find("zzz.txt") != std::string::npos);
        REQUIRE(result.find("bbb_dir") != std::string::npos);

        std::vector<std::string> lines;
        std::istringstream iss(result);
        for (std::string line; std::getline(iss, line); ) {
            if (!line.empty()) {
                lines.push_back(line);
            }
        }

        if (!lines.empty()) {
            std::vector<std::string> names;
            for (const auto& line : lines) {
                auto last_space = line.find_last_of(' ');
                names.push_back(line.substr(last_space + 1));
            }

            std::vector<std::string> sorted_names = names;
            std::sort(sorted_names.begin(), sorted_names.end(), [](const auto& a, const auto& b) {
                return std::lexicographical_compare(
                    a.begin(), a.end(), b.begin(), b.end(),
                    [](char c1, char c2) { return tolower(c1) < tolower(c2); }
                );
            });

            REQUIRE(names == sorted_names);
        }
    }

    SECTION("Test listing directory sorted by size") {
        auto [success, result] = command_ls(fixture.temp_dir.string(), "size");
        REQUIRE(success);
        REQUIRE(result.find("aaa.txt") != std::string::npos);
        REQUIRE(result.find("zzz.txt") != std::string::npos);
        REQUIRE(result.find("bbb_dir") != std::string::npos);
    }

    SECTION("Test listing directory in reverse order") {
        auto [success_asc, result_asc] = command_ls(fixture.temp_dir.string(), "name", false);
        auto [success_desc, result_desc] = command_ls(fixture.temp_dir.string(), "name", true);

        REQUIRE(success_asc);
        REQUIRE(success_desc);

        std::vector<std::string> lines_asc;
        std::istringstream iss_asc(result_asc);
        for (std::string line; std::getline(iss_asc, line); ) {
            if (!line.empty()) {
                lines_asc.push_back(line);
            }
        }

        std::vector<std::string> lines_desc;
        std::istringstream iss_desc(result_desc);
        for (std::string line; std::getline(iss_desc, line); ) {
            if (!line.empty()) {
                lines_desc.push_back(line);
            }
        }

        if (!lines_asc.empty() && !lines_desc.empty()) {
            std::vector<std::string> names_asc;
            for (const auto& line : lines_asc) {
                auto last_space = line.find_last_of(' ');
                names_asc.push_back(line.substr(last_space + 1));
            }

            std::vector<std::string> names_desc;
            for (const auto& line : lines_desc) {
                auto last_space = line.find_last_of(' ');
                names_desc.push_back(line.substr(last_space + 1));
            }

            std::reverse(names_desc.begin(), names_desc.end());
            REQUIRE(names_asc == names_desc);
        }
    }

    SECTION("Test invalid directory path") {
        auto [success, result] = command_ls((fixture.temp_dir / "missing").string());
        REQUIRE_FALSE(success);
        REQUIRE(result == "[invalid directory path]");
    }
}
