TEST_CASE("is_SNAKE_CASE") {
    SECTION("should return true for a valid snake_case string") {
        REQUIRE(is_SNAKE_CASE("snake_case") == true);
    }

    SECTION("should return true for a valid snake_case string with multiple words") {
        REQUIRE(is_SNAKE_CASE("snake_case_example") == true);
    }

    SECTION("should return false for a string that starts with an uppercase letter") {
        REQUIRE(is_SNAKE_CASE("Snake_Case") == false);
    }

    SECTION("should return false for a string with mixed case letters") {
        REQUIRE(is_SNAKE_CASE("snakeCASE") == false);
    }

    SECTION("should return false for a string with numbers") {
        REQUIRE(is_SNAKE_CASE("snake_case_123") == false);
    }

    SECTION("should return false for an empty string") {
        REQUIRE(is_SNAKE_CASE("") == false);
    }
}