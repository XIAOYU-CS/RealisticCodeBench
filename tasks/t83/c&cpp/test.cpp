namespace fs = std::filesystem;

void write_file_with_encoding(const std::string& path, const std::string& text, const std::string& encoding) {
    std::ofstream file(path, std::ios::binary);
    if (!file) {
        throw std::runtime_error("Cannot open file for writing: " + path);
    }
    file.write(text.data(), static_cast<std::streamsize>(text.size()));
}

std::string read_file_with_encoding(const std::string& path, const std::string& encoding) {
    std::ifstream file(path, std::ios::binary);
    if (!file) {
        throw std::runtime_error("Cannot open file for reading: " + path);
    }
    return std::string((std::istreambuf_iterator<char>(file)),
                       std::istreambuf_iterator<char>());
}


TEST_CASE("File encoding conversion", "[encoding]") {
    const std::string test_dir = "test_files";
    const std::string input_file = test_dir + "/test_input.txt";
    const std::string output_file = test_dir + "/test_output.txt";

    if (!fs::exists(test_dir)) {
        fs::create_directories(test_dir);
    }

    struct Cleanup {
        std::string dir;
        ~Cleanup() {
            try {
                fs::remove_all(dir);
            } catch (...) {}
        }
    } cleanup{test_dir};

    SECTION("CP932 to UTF-16") {
        const char cp932_data[] = {
            char(0x82), char(0xb1), char(0x82), char(0xea), char(0x82), char(0xcd),
            char(0x83), char(0x5e), char(0x83), char(0x58), char(0x83), char(0x67),
            char(0x82), char(0xc5), char(0x82), char(0xb7)
        };
        const std::string cp932_bytes(cp932_data, sizeof(cp932_data));
        write_file_with_encoding(input_file, cp932_bytes, "cp932");

        bool result = convert_encoding(input_file, output_file, "cp932", "utf_16");
        REQUIRE(result == true);
        REQUIRE(fs::exists(output_file));
        REQUIRE(fs::file_size(output_file) > 0);
    }

    SECTION("UTF-16 to UTF-16") {
        const char utf16_data[] = {
            char(0xff), char(0xfe), 'N', 0, 'o', 0, ' ', 0, 'c', 0, 'o', 0,
            'n', 0, 'v', 0, 'e', 0, 'r', 0, 's', 0, 'i', 0, 'o', 0, 'n', 0
        };
        const std::string utf16_content(utf16_data, sizeof(utf16_data));
        write_file_with_encoding(input_file, utf16_content, "utf_16");
        bool result = convert_encoding(input_file, output_file, "utf_16", "utf_16");
        REQUIRE(result == true);
    }

    SECTION("UTF-8 to UTF-16") {
        const std::string utf8_text = "これはUTF-8からUTF-16へのテストです。";
        write_file_with_encoding(input_file, utf8_text, "utf-8");
        bool result = convert_encoding(input_file, output_file, "utf-8", "utf_16");
        REQUIRE(result == true);
        REQUIRE(fs::exists(output_file));
        REQUIRE(fs::file_size(output_file) > 0);
    }

    SECTION("CP932 to UTF-8") {
        const char cp932_data[] = {
            char(0x82), char(0xb5), char(0x82), char(0xdd), char(0x82), char(0xc6),
            char(0x82), char(0x54), char(0x82), char(0x58), char(0x82), char(0xc8),
            char(0x82), char(0xdd), char(0x82), char(0xc6), char(0x82), char(0xa4),
            char(0x82), char(0xdc)
        };
        const std::string cp932_bytes(cp932_data, sizeof(cp932_data));
        write_file_with_encoding(input_file, cp932_bytes, "cp932");
        bool result = convert_encoding(input_file, output_file, "cp932", "utf-8");
        REQUIRE(result == true);
        REQUIRE(fs::exists(output_file));
        std::string content = read_file_with_encoding(output_file, "utf-8");
        REQUIRE_FALSE(content.empty());
    }

    SECTION("UTF-16 to CP932") {
        const char utf16_data[] = {
            char(0xff), char(0xfe), 'U', 0, 'T', 0, 'F', 0, '-', 0,
            '1', 0, '6', 0, ' ', 0, 't', 0, 'o', 0, ' ', 0,
            'c', 0, 'p', 0, '9', 0, '3', 0, '2', 0
        };
        const std::string utf16_bytes(utf16_data, sizeof(utf16_data));
        write_file_with_encoding(input_file, utf16_bytes, "utf_16");
        bool result = convert_encoding(input_file, output_file, "utf_16", "cp932");
        REQUIRE(result == true);
        REQUIRE(fs::exists(output_file));
        REQUIRE(fs::file_size(output_file) > 0);
    }
}
