static std::vector<std::vector<std::string>> read_input(const std::string& input) {
    std::istringstream input_stream(input);
    std::streambuf* prev_cin = std::cin.rdbuf(input_stream.rdbuf());
    auto result = read_tsv_from_stdin();
    std::cin.rdbuf(prev_cin);
    return result;
}

TEST_CASE("read_tsv_from_stdin parses and pads TSV input") {
    SECTION("basic TSV input") {
    const std::vector<std::vector<std::string>> expected_output = {
        {"col1", "col2", "col3"},
        {"val1", "val2", "val3"}
    };
        REQUIRE(read_input("col1\tcol2\tcol3\nval1\tval2\tval3\n") == expected_output);
    }

    SECTION("single column") {
    const std::vector<std::vector<std::string>> expected_output = {
        {"col1"},
        {"val1"},
        {"val2"}
    };
        REQUIRE(read_input("col1\nval1\nval2\n") == expected_output);
    }

    SECTION("all rows empty after header") {
        const std::vector<std::vector<std::string>> expected_output = {
            {"col1", "col2", "col3"},
            {"", "", ""},
            {"", "", ""}
        };
        REQUIRE(read_input("col1\tcol2\tcol3\n\n\n") == expected_output);
    }

    SECTION("multiple consecutive tabs") {
        const std::vector<std::vector<std::string>> expected_output = {
            {"col1", "", "col2", "col3"},
            {"val1", "", "val2", "val3"}
        };
        REQUIRE(read_input("col1\t\tcol2\tcol3\nval1\t\tval2\tval3\n") == expected_output);
    }

    SECTION("missing columns are padded") {
        const std::vector<std::vector<std::string>> expected_output = {
            {"col1", "col2", "col3"},
            {"val1", "val2", ""},
            {"val1.1", "val2.1", "val3.1"}
        };
        REQUIRE(read_input("col1\tcol2\tcol3\nval1\tval2\nval1.1\tval2.1\tval3.1\n") == expected_output);
    }
}
