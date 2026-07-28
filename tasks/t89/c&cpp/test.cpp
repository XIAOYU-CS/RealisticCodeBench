TEST_CASE("TestFormatText", "[format_text]") {
    SECTION("test_basic_text") {
        std::string input_text = "This is line one.\nThis is line two.\nThis is line three.";
        std::string expected_output = "This is line one. This is line two. This is line three.";

        std::filesystem::path temp_dir = std::filesystem::temp_directory_path();
        std::string input_file_path = (temp_dir / "input.txt").string();
        std::string output_file_path = (temp_dir / "output.txt").string();

        std::ofstream input_file(input_file_path);
        input_file << input_text;
        input_file.close();

        format_text(input_file_path, output_file_path);

        std::ifstream output_file(output_file_path);
        std::string output_text((std::istreambuf_iterator<char>(output_file)), std::istreambuf_iterator<char>());
        output_file.close();

        REQUIRE(expected_output == output_text);

        std::remove(input_file_path.c_str());
        std::remove(output_file_path.c_str());
    }

    SECTION("test_single_line") {
        std::string input_text = "This is a single line.";
        std::string expected_output = "This is a single line.";

        std::filesystem::path temp_dir = std::filesystem::temp_directory_path();
        std::string input_file_path = (temp_dir / "input.txt").string();
        std::string output_file_path = (temp_dir / "output.txt").string();

        std::ofstream input_file(input_file_path);
        input_file << input_text;
        input_file.close();

        format_text(input_file_path, output_file_path);

        std::ifstream output_file(output_file_path);
        std::string output_text((std::istreambuf_iterator<char>(output_file)), std::istreambuf_iterator<char>());
        output_file.close();

        REQUIRE(expected_output == output_text);

        std::remove(input_file_path.c_str());
        std::remove(output_file_path.c_str());
    }

    SECTION("test_empty_file") {
        std::string input_text = "";
        std::string expected_output = "";

        std::filesystem::path temp_dir = std::filesystem::temp_directory_path();
        std::string input_file_path = (temp_dir / "input.txt").string();
        std::string output_file_path = (temp_dir / "output.txt").string();

        std::ofstream input_file(input_file_path);
        input_file << input_text;
        input_file.close();
        format_text(input_file_path, output_file_path);

        std::ifstream output_file(output_file_path);
        std::string output_text((std::istreambuf_iterator<char>(output_file)), std::istreambuf_iterator<char>());
        output_file.close();

        REQUIRE(expected_output == output_text);

        std::remove(input_file_path.c_str());
        std::remove(output_file_path.c_str());
    }

    SECTION("test_file_with_no_newlines") {
        std::string input_text = "This is a continuous line without breaks.";
        std::string expected_output = "This is a continuous line without breaks.";

        std::filesystem::path temp_dir = std::filesystem::temp_directory_path();
        std::string input_file_path = (temp_dir / "input.txt").string();
        std::string output_file_path = (temp_dir / "output.txt").string();

        std::ofstream input_file(input_file_path);
        input_file << input_text;
        input_file.close();

        format_text(input_file_path, output_file_path);

        std::ifstream output_file(output_file_path);
        std::string output_text((std::istreambuf_iterator<char>(output_file)), std::istreambuf_iterator<char>());
        output_file.close();

        REQUIRE(expected_output == output_text);

        std::remove(input_file_path.c_str());
        std::remove(output_file_path.c_str());
    }

    SECTION("test_missing_input_file") {
        std::filesystem::path temp_dir = std::filesystem::temp_directory_path();
        std::string input_file_path = (temp_dir / "missing_input_t89.txt").string();
        std::string output_file_path = (temp_dir / "missing_output_t89.txt").string();

        std::remove(input_file_path.c_str());
        std::remove(output_file_path.c_str());

        format_text(input_file_path, output_file_path);

        REQUIRE_FALSE(std::filesystem::exists(output_file_path));
    }
}
