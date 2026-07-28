#include <chrono>
#include <filesystem>
#include <fstream>
#include <optional>
#include <string>
#include <vector>

namespace fs = std::filesystem;

struct CwdFixture {
    fs::path original = fs::current_path();
    fs::path base = fs::temp_directory_path() /
                    ("t366_enhanced_cd_" + std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()));
    fs::path dir1;
    fs::path dir2;

    CwdFixture() {
        fs::create_directories(base / "dir1");
        fs::create_directories(base / "dir2");
        fs::current_path(base);
        base = fs::current_path();
        dir1 = base / "dir1";
        dir2 = base / "dir2";
    }

    ~CwdFixture() {
        std::error_code ec;
        fs::current_path(original, ec);
        fs::remove_all(base, ec);
    }
};

TEST_CASE("TestEnhancedCd") {
    CwdFixture fixture;

    SECTION("Test getting current directory information without changing") {
        auto [success, message, new_dir] = enhanced_cd(std::nullopt);
        REQUIRE(success);
        REQUIRE(message.find("Current directory:") != std::string::npos);
        REQUIRE(new_dir.has_value());
        REQUIRE(*new_dir == fixture.base.string());
        REQUIRE(fs::current_path() == fixture.base);
    }

    SECTION("Test changing to a valid directory") {
        auto [success, message, new_dir] = enhanced_cd(fixture.dir1.string());
        REQUIRE(success);
        REQUIRE(message.find("Changed to:") != std::string::npos);
        REQUIRE(new_dir.has_value());
        REQUIRE(*new_dir == fixture.dir1.string());
        REQUIRE(fs::current_path() == fixture.dir1);
    }

    SECTION("Test changing to a nonexistent directory") {
        fs::path current_dir = fs::current_path();
        auto [success, message, new_dir] = enhanced_cd((fixture.base / "missing").string());
        REQUIRE_FALSE(success);
        REQUIRE(message.find("Error:") != std::string::npos);
        REQUIRE_FALSE(new_dir.has_value());
        REQUIRE(fs::current_path() == current_dir);
    }

    SECTION("Test attempting to change to a file (should fail)") {
        fs::path test_file = fixture.base / "test_file.txt";
        std::ofstream(test_file.string()).close();

        fs::path current_dir = fs::current_path();
        auto [success, message, new_dir] = enhanced_cd(test_file.string());
        REQUIRE_FALSE(success);
        REQUIRE(message.find("Error: Not a valid directory") != std::string::npos);
        REQUIRE_FALSE(new_dir.has_value());
        REQUIRE(fs::current_path() == current_dir);
    }

    SECTION("Test history functionality and switching with '-'") {
        REQUIRE(std::get<0>(enhanced_cd(fixture.dir1.string())));
        REQUIRE(std::get<0>(enhanced_cd(fixture.dir2.string())));

        auto [success, message, new_dir] = enhanced_cd("-");
        REQUIRE(success);
        REQUIRE(message.find("Changed to:") != std::string::npos);
        REQUIRE(new_dir.has_value());
        REQUIRE(*new_dir == fixture.dir1.string());
        REQUIRE(fs::current_path() == fixture.dir1);
    }

    SECTION("Test zero history limit disables history") {
        REQUIRE(std::get<0>(enhanced_cd(fixture.dir1.string(), 0)));
        fs::path current_dir = fs::current_path();

        auto [success, message, new_dir] = enhanced_cd("-", 0);
        REQUIRE_FALSE(success);
        REQUIRE(message.find("No history") != std::string::npos);
        REQUIRE_FALSE(new_dir.has_value());
        REQUIRE(fs::current_path() == current_dir);
    }
}
