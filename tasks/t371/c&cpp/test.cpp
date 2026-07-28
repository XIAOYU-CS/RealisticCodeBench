#include <filesystem>

namespace fs = std::filesystem;

TEST_CASE("Test file copying functionality") {
    std::string temp_dir = fs::temp_directory_path().string() + "/test_copy_file";
    std::string source_file = temp_dir + "/source.txt";
    std::string dest_file = temp_dir + "/dest.txt";
    std::string source_content = "Hello, World! This is a test file for copying.";

    // Setup
    fs::remove_all(temp_dir);
    fs::create_directory(temp_dir);
    std::ofstream source_stream(source_file);
    source_stream << source_content;
    source_stream.close();

    SECTION("Test successful file copy without overwrite") {
        auto [success, message] = copy_file(source_file, dest_file);

        REQUIRE(success);
        REQUIRE(message == "[file copied successfully]");
        REQUIRE(fs::exists(dest_file));

        std::ifstream dest_stream(dest_file);
        std::string copied_content((std::istreambuf_iterator<char>(dest_stream)), 
                                 std::istreambuf_iterator<char>());
        REQUIRE(copied_content == source_content);
        REQUIRE(fs::file_size(source_file) == fs::file_size(dest_file));
    }

    SECTION("Test file copy with overwrite enabled") {
        // First create destination file
        std::ofstream dest_stream(dest_file);
        dest_stream << "Original content";
        dest_stream.close();

        // Copy with overwrite enabled
        auto [success, message] = copy_file(source_file, dest_file, true);

        REQUIRE(success);
        REQUIRE(message == "[file copied successfully]");
        REQUIRE(fs::exists(dest_file));

        std::ifstream new_dest_stream(dest_file);
        std::string copied_content((std::istreambuf_iterator<char>(new_dest_stream)), 
                                 std::istreambuf_iterator<char>());
        REQUIRE(copied_content == source_content);
    }

    SECTION("Test copy fails when destination exists and overwrite is False") {
        // Create destination file
        std::ofstream dest_stream(dest_file);
        dest_stream << "Existing content";
        dest_stream.close();

        // Try to copy without overwrite
        auto [success, message] = copy_file(source_file, dest_file, false);

        REQUIRE_FALSE(success);
        REQUIRE(message == "[destination exists, not overwritten]");

        std::ifstream existing_dest_stream(dest_file);
        std::string dest_content((std::istreambuf_iterator<char>(existing_dest_stream)), 
                               std::istreambuf_iterator<char>());
        REQUIRE(dest_content == "Existing content");
    }

    SECTION("Test copy fails with invalid source path") {
        std::string invalid_source = "/non/existent/source/file.txt";
        auto [success, message] = copy_file(invalid_source, dest_file);

        REQUIRE_FALSE(success);
        REQUIRE(message == "[cannot resolve source path]");
    }

    SECTION("Test copy fails with invalid arguments") {
        // Test with empty source path
        auto [success1, message1] = copy_file("", dest_file);
        REQUIRE_FALSE(success1);
        REQUIRE(message1 == "[invalid argument]");

        // Test with empty destination path
        auto [success2, message2] = copy_file(source_file, "");
        REQUIRE_FALSE(success2);
        REQUIRE(message2 == "[invalid argument]");

        // Test with invalid buffer size
        auto [success3, message3] = copy_file(source_file, dest_file, false, true, false, 0);
        REQUIRE_FALSE(success3);
        REQUIRE(message3 == "[invalid argument]");
    }

    // Cleanup
    fs::remove_all(temp_dir);
}
