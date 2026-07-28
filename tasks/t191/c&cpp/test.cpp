TEST_CASE("shuffle_string_characters") {
    auto sorted = [](std::string value) {
        std::sort(value.begin(), value.end());
        return value;
    };

    SECTION("should return a string of the same length as the input") {
        std::string input = "abcdef";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result.length() == input.length());
    }

    SECTION("should shuffle the characters in the string") {
        std::string input = "hello";
        std::string result = shuffle_string_characters(input);
        REQUIRE(sorted(result) == sorted(input));
    }

    SECTION("should return an empty string when given an empty string") {
        std::string input = "";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result == "");
    }

    SECTION("should handle a single character string") {
        std::string input = "a";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result == "a");
    }

    SECTION("should handle strings with identical characters") {
        std::string input = "aaaaa";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result == "aaaaa");
    }

    SECTION("should return a shuffled string for longer strings") {
        std::string input = "abcdefghijklmnopqrstuvwxyz";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result.length() == input.length());
        REQUIRE(sorted(result) == sorted(input));
    }

    SECTION("should return the same string if all characters are the same") {
        std::string input = "111111";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result == "111111");
    }

    SECTION("should shuffle a string containing special characters") {
        std::string input = "a!@#$%^&*()_+";
        std::string result = shuffle_string_characters(input);
        REQUIRE(result.length() == input.length());
        REQUIRE(sorted(result) == sorted(input));
    }
}
