TEST_CASE("TestSaveContentToFile", "[save_content_to_file]") {
    const std::string test_file_path = "test_output.txt";
    auto read_file = [&]() {
        std::ifstream file(test_file_path);
        REQUIRE(file.is_open());
        return std::string((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
    };

    SECTION("Basic content") {
        std::string content = "Hello,  World!  ";
        std::string expected = "Hello, World!";
        save_content_to_file(content, test_file_path);

        REQUIRE(read_file() == expected);
    }

    SECTION("Multiple spaces and empty lines") {
        std::string content = R"(
        
        This is a    test.

        Another line.      
        )";
        std::string expected = "This is a test. Another line.";
        save_content_to_file(content, test_file_path);

        REQUIRE(read_file() == expected);
    }

    SECTION("Only whitespace") {
        std::string content = "    \n  \n   ";
        std::string expected = "";
        save_content_to_file(content, test_file_path);

        REQUIRE(read_file() == expected);
    }

    SECTION("Empty content") {
        std::string content = "";
        std::string expected = "";
        save_content_to_file(content, test_file_path);

        REQUIRE(read_file() == expected);
    }

    SECTION("Mixed whitespace") {
        std::string content = "Alpha\t\tBeta\nGamma\r\n   Delta";
        std::string expected = "Alpha Beta Gamma Delta";
        save_content_to_file(content, test_file_path);

        REQUIRE(read_file() == expected);
    }
    std::remove(test_file_path.c_str());
}
