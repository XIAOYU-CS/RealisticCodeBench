TEST_CASE("count_letters", "[count_letters]") {
    SECTION("should return 10 for the string 'Hello, World!'") {
        REQUIRE(count_letters("Hello, World!") == 10);
    }

    SECTION("should return 0 for a string with no letters '12345'") {
        REQUIRE(count_letters("12345") == 0);
    }

    SECTION("should return 6 for the string 'abc 123 xyz!'") {
        REQUIRE(count_letters("abc 123 xyz!") == 6);
    }

    SECTION("should return 0 for an empty string") {
        REQUIRE(count_letters("") == 0);
    }

    SECTION("should return 3 for the string 'A1B2C3!@#'") {
        REQUIRE(count_letters("A1B2C3!@#") == 3);
    }

    SECTION("should return 5 for a string with mixed case 'AbCdE'") {
        REQUIRE(count_letters("AbCdE") == 5);
    }

    SECTION("should return 5 for a string with special characters 'Hello@2024!'") {
        REQUIRE(count_letters("Hello@2024!") == 5);
    }
}