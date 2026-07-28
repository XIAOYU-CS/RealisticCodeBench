#include <filesystem>
#include <fstream>
#include <stdexcept>
#include <string>

namespace fs = std::filesystem;

struct TestDirectoryOperations {
    std::string source_dir = "testSourceDir";
    std::string target_dir = "testTargetDir";

    TestDirectoryOperations() {
        fs::remove_all(source_dir);
        fs::remove_all(target_dir);
        fs::create_directories(source_dir);
        fs::create_directories(target_dir);
    }

    ~TestDirectoryOperations() {
        fs::remove_all(source_dir);
        fs::remove_all(target_dir);
    }
};

TEST_CASE("copy_directory behavior") {
    SECTION("Copy empty directory") {
        TestDirectoryOperations fixture;
        copy_directory(fixture.source_dir, fixture.target_dir);

        REQUIRE(fs::exists(fixture.target_dir));
        REQUIRE(fs::is_directory(fixture.target_dir));
        REQUIRE(fs::is_empty(fixture.target_dir));
    }

    SECTION("Copy directory with files") {
        TestDirectoryOperations fixture;
        std::string test_file = (fs::path(fixture.source_dir) / "testFile.txt").string();
        {
            std::ofstream f(test_file);
            f << "Sample content";
        }

        copy_directory(fixture.source_dir, fixture.target_dir);

        std::string copied_file = (fs::path(fixture.target_dir) / "testFile.txt").string();
        REQUIRE(fs::exists(copied_file));
        REQUIRE(fs::file_size(test_file) == fs::file_size(copied_file));
    }

    SECTION("Non-existent source directory") {
        TestDirectoryOperations fixture;
        std::string non_existent_dir = "nonExistentDir";

        REQUIRE_THROWS_AS(copy_directory(non_existent_dir, fixture.target_dir), std::invalid_argument);
    }

    SECTION("Copy directory with subdirectories") {
        TestDirectoryOperations fixture;
        std::string sub_dir = (fs::path(fixture.source_dir) / "subDir").string();
        fs::create_directories(sub_dir);
        std::string test_file = (fs::path(sub_dir) / "testFile.txt").string();
        {
            std::ofstream f(test_file);
            f << "Sample content in subdirectory";
        }

        copy_directory(fixture.source_dir, fixture.target_dir);

        std::string copied_sub_dir = (fs::path(fixture.target_dir) / "subDir").string();
        std::string copied_file = (fs::path(copied_sub_dir) / "testFile.txt").string();

        REQUIRE(fs::exists(copied_sub_dir));
        REQUIRE(fs::exists(copied_file));
    }

    SECTION("Overwrite file in target directory") {
        TestDirectoryOperations fixture;
        std::string test_file = (fs::path(fixture.source_dir) / "testFile.txt").string();
        {
            std::ofstream f(test_file);
            f << "Source content";
        }

        std::string target_file = (fs::path(fixture.target_dir) / "testFile.txt").string();
        {
            std::ofstream f(target_file);
            f << "Target content";
        }

        copy_directory(fixture.source_dir, fixture.target_dir);

        std::string copied_file = (fs::path(fixture.target_dir) / "testFile.txt").string();
        REQUIRE(fs::exists(copied_file));

        std::ifstream f(copied_file);
        std::string copied_content((std::istreambuf_iterator<char>(f)), std::istreambuf_iterator<char>());

        REQUIRE(copied_content == "Source content");
    }
}
