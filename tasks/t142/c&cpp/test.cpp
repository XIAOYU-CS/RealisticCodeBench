TEST_CASE("generate_alphabet_array") {
    SECTION("should return a vector of 52 characters") {
        auto result = generate_alphabet_array();
        REQUIRE(result.size() == 52);
    }

    SECTION("should start with lowercase letters from a to z") {
        auto result = generate_alphabet_array();
        std::vector<char> lowercaseAlphabets(result.begin(), result.begin() + 26);
        std::vector<char> expected = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                                       'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        REQUIRE(lowercaseAlphabets == expected);
    }

    SECTION("should end with uppercase letters from A to Z") {
        auto result = generate_alphabet_array();
        std::vector<char> uppercaseAlphabets(result.begin() + 26, result.end());
        std::vector<char> expected = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                                       'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'};
        REQUIRE(uppercaseAlphabets == expected);
    }

    SECTION("should return 'a' as the first element") {
        auto result = generate_alphabet_array();
        REQUIRE(result[0] == 'a');
    }

    SECTION("should return 'Z' as the last element") {
        auto result = generate_alphabet_array();
        REQUIRE(result.back() == 'Z');
    }
}