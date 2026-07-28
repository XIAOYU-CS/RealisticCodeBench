#include <algorithm>
#include <filesystem>
#include <fstream>
#include <string>
#include <system_error>
#include <variant>
#include <vector>

namespace fs = std::filesystem;

struct MvFixture {
    fs::path temp_dir = fs::temp_directory_path() / "test_mv_temp_t369";
    fs::path source_dir = temp_dir / "source";
    fs::path dest_dir = temp_dir / "dest";
    fs::path single_file = temp_dir / "test_file.txt";
    fs::path single_dest = temp_dir / "new_file.txt";

    MvFixture() {
        std::error_code ec;
        fs::remove_all(temp_dir, ec);
        fs::create_directories(source_dir);
        fs::create_directories(dest_dir);
        write_file(single_file, "test content");
        write_file(source_dir / "file1.txt", "content1");
        write_file(source_dir / "file2.txt", "content2");
    }

    ~MvFixture() {
        std::error_code ec;
        fs::remove_all(temp_dir, ec);
    }

    static void write_file(const fs::path& path, const std::string& content) {
        std::ofstream file(path);
        file << content;
    }
};

TEST_CASE("mv behavior") {
    SECTION("single file move succeeds") {
        MvFixture fix;
        auto [success, fail] =
            mv(std::variant<std::string, std::vector<std::string>>(fix.single_file.string()),
               fix.single_dest.string());

        REQUIRE(success.size() == 1);
        REQUIRE(fail.empty());
        REQUIRE(success[0] == fix.single_file.string());
        REQUIRE(fs::exists(fix.single_dest));
        REQUIRE_FALSE(fs::exists(fix.single_file));
    }

    SECTION("multiple files move into existing directory") {
        MvFixture fix;
        std::vector<std::string> source_files = {
            (fix.source_dir / "file1.txt").string(),
            (fix.source_dir / "file2.txt").string(),
        };

        auto [success, fail] = mv(source_files, fix.dest_dir.string());

        REQUIRE(success.size() == 2);
        REQUIRE(fail.empty());
        REQUIRE(std::find(success.begin(), success.end(), source_files[0]) != success.end());
        REQUIRE(std::find(success.begin(), success.end(), source_files[1]) != success.end());
        REQUIRE(fs::exists(fix.dest_dir / "file1.txt"));
        REQUIRE(fs::exists(fix.dest_dir / "file2.txt"));
        REQUIRE_FALSE(fs::exists(source_files[0]));
        REQUIRE_FALSE(fs::exists(source_files[1]));
    }

    SECTION("overwrite replaces existing destination") {
        MvFixture fix;
        auto dest_file = fix.dest_dir / "file1.txt";
        MvFixture::write_file(dest_file, "old content");
        auto source_file = fix.source_dir / "file1.txt";

        auto [success, fail] = mv(source_file.string(), dest_file.string(), true);

        REQUIRE(success.size() == 1);
        REQUIRE(fail.empty());
        REQUIRE(fs::exists(dest_file));
        REQUIRE_FALSE(fs::exists(source_file));

        std::ifstream file(dest_file);
        std::string content((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
        REQUIRE(content == "content1");
    }

    SECTION("existing destination fails without overwrite") {
        MvFixture fix;
        auto dest_file = fix.dest_dir / "file1.txt";
        MvFixture::write_file(dest_file, "existing content");
        auto source_file = fix.source_dir / "file1.txt";

        auto [success, fail] = mv(source_file.string(), dest_file.string(), false);

        REQUIRE(success.empty());
        REQUIRE(fail.size() == 1);
        REQUIRE(fail[0].first == source_file.string());
        REQUIRE(fail[0].second.find("Destination already exists") != std::string::npos);
        REQUIRE(fs::exists(source_file));
        REQUIRE(fs::exists(dest_file));
    }

    SECTION("nonexistent source is reported as failure") {
        MvFixture fix;
        auto nonexistent_file = fix.temp_dir / "nonexistent.txt";
        auto dest_file = fix.dest_dir / "new_file.txt";

        auto [success, fail] = mv(nonexistent_file.string(), dest_file.string());

        REQUIRE(success.empty());
        REQUIRE(fail.size() == 1);
        REQUIRE(fail[0].first == nonexistent_file.string());
        REQUIRE(fail[0].second.find("Source path does not exist") != std::string::npos);
        REQUIRE_FALSE(fs::exists(dest_file));
    }
}
