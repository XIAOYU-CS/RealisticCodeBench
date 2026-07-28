TEST_CASE("Default behavior", "[custom_format_file_path]") {
    std::string path = "/artifacts/workspace/project_items/";
    std::string result = custom_format_file_path(path);
    REQUIRE(result == "artifacts_workspace_project_items");
}

TEST_CASE("Custom separators and replacements", "[custom_format_file_path]") {
    std::string path = "bundle\\include\\my_file";
    std::string result = custom_format_file_path(
        path,
        "\\",
        "-",
        ""
    );
    REQUIRE(result == "bundle-include-my_file");
}

TEST_CASE("Custom remove items and suffixes", "[custom_format_file_path]") {
    std::string path = "src/resources/data_logs_v2";
    std::vector<std::string> remove_items = {"src", "logs"};
    std::vector<std::string> extra_suffixes = {"_v2", "_data"};
    
    std::string result = custom_format_file_path(
        path,
        "/",
        "_",
        "_",
        &remove_items,
        &extra_suffixes
    );
    REQUIRE(result == "resources");
}

TEST_CASE("Empty path and edge cases", "[custom_format_file_path]") {
    REQUIRE(custom_format_file_path("") == "");
    REQUIRE(custom_format_file_path("////") == "");
    REQUIRE(custom_format_file_path("properties/items") == "properties_items");
}

TEST_CASE("Strip chars behavior", "[custom_format_file_path]") {
    std::string path1 = "__resources/project__";
    REQUIRE(custom_format_file_path(path1) == "resources_project");
    
    std::string path2 = "--bundle/data--";
    std::vector<std::string> remove_items = {"bundle"};
    std::string result = custom_format_file_path(
        path2,
        "/",
        "_",
        "-",
        &remove_items
    );
    REQUIRE(result == "data");
}