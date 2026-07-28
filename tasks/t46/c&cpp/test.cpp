TEST_CASE("Test remove_common_indentation function", "[remove_common_indentation]") {
    SECTION("test_empty_string") {
        CHECK(remove_common_indentation("") == "");
    }

    SECTION("test_single_line_string") {
        CHECK(remove_common_indentation("No indentation here") == "No indentation here");
    }

    SECTION("test_multiple_lines_with_uniform_indentation") {
        std::string input_text = "    Line one\n    Line two\n    Line three";
        std::string expected_output = "Line one\nLine two\nLine three";
        CHECK(remove_common_indentation(input_text) == expected_output);
    }

    SECTION("test_multiple_lines_with_mixed_indentation") {
        std::string input_text = "  Line one\n  Line two\n  Line three";
        std::string expected_output = "Line one\nLine two\nLine three";
        CHECK(remove_common_indentation(input_text) == expected_output);
    }

    SECTION("test_preserves_relative_indentation") {
        std::string input_text = "    parent\n        child\n    sibling";
        std::string expected_output = "parent\n    child\nsibling";
        CHECK(remove_common_indentation(input_text) == expected_output);
    }
}
