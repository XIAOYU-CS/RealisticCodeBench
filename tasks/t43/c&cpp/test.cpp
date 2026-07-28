TEST_CASE("TestDictOfListsToListOfDicts") {
    SECTION("test_standard_conversion") {
        std::map<std::string, std::vector<std::string>> dict_of_lists = {
            {"name", {"Alice", "Bob", "Charlie"}},
            {"age", {"25", "30", "35"}},
            {"city", {"New York", "Los Angeles", "Chicago"}}
        };
        std::vector<std::map<std::string, std::string>> expected_result = {
            {{"name", "Alice"}, {"age", "25"}, {"city", "New York"}},
            {{"name", "Bob"}, {"age", "30"}, {"city", "Los Angeles"}},
            {{"name", "Charlie"}, {"age", "35"}, {"city", "Chicago"}}
        };

        auto result = transform_dict_lists_to_list_dicts(dict_of_lists);
        REQUIRE(result == expected_result);
    }

    SECTION("test_empty_lists") {
        std::map<std::string, std::vector<std::string>> dict_of_lists = {
            {"name", {}},
            {"age", {}},
            {"city", {}}
        };
        std::vector<std::map<std::string, std::string>> expected_result = {};

        auto result = transform_dict_lists_to_list_dicts(dict_of_lists);
        REQUIRE(result == expected_result);
    }

    SECTION("test_empty_dictionary") {
        std::map<std::string, std::vector<std::string>> dict_of_lists = {};
        std::vector<std::map<std::string, std::string>> expected_result = {};

        auto result = transform_dict_lists_to_list_dicts(dict_of_lists);
        REQUIRE(result == expected_result);
    }

    SECTION("test_single_element_lists") {
        std::map<std::string, std::vector<std::string>> dict_of_lists = {
            {"name", {"Alice"}},
            {"age", {"25"}},
            {"city", {"New York"}}
        };
        std::vector<std::map<std::string, std::string>> expected_result = {
            {{"name", "Alice"}, {"age", "25"}, {"city", "New York"}}
        };

        auto result = transform_dict_lists_to_list_dicts(dict_of_lists);
        REQUIRE(result == expected_result);
    }

    SECTION("test_different_length_lists") {
        std::map<std::string, std::vector<std::string>> dict_of_lists = {
            {"a", {"1", "2", "3"}},
            {"b", {"4", "5"}}
        };

        try {
            transform_dict_lists_to_list_dicts(dict_of_lists);
            FAIL("Expected invalid_argument");
        } catch (const std::invalid_argument& exception) {
            REQUIRE(std::string(exception.what()).find("same length") != std::string::npos);
        }
    }
}
