TEST_CASE("Test checking owner read and write permissions", "[check_permissions]") {
    std::string line = "-rw-r--r-- 1 user group 1024 Jan 1 12:00 file.txt";
    bool result = check_permissions(line, std::vector<std::string>{"r", "w"}, "owner");
    REQUIRE(result == true);
}

TEST_CASE("Test checking group execute permission only", "[check_permissions]") {
    std::string line = "-rwx--x--x 1 user group 1024 Jan 1 12:00 script.sh";
    bool result = check_permissions(line, std::vector<std::string>{"x"}, "group");
    REQUIRE(result == true);
}

TEST_CASE("Test checking other user permissions when read access is denied", "[check_permissions]") {
    std::string line = "-rwxrwx--- 1 user group 1024 Jan 1 12:00 private_file.txt";
    bool result = check_permissions(line, std::vector<std::string>{"r"}, "other");
    REQUIRE(result == false);
}

TEST_CASE("Test default behavior with no required permissions specified", "[check_permissions]") {
    std::string line = "-rwxr-xr-- 1 user group 1024 Jan 1 12:00 file.txt";
    bool result = check_permissions(line);
    REQUIRE(result == true);
}

TEST_CASE("Test handling of invalid permission format", "[check_permissions]") {
    std::string line = "invalid_line_without_proper_permissions";
    bool result = check_permissions(line, std::vector<std::string>{"r"}, "owner");
    REQUIRE(result == false);
}
