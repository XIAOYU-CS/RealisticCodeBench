TEST_CASE("is_valid_username", "[username]") {
    SECTION("should return true for a valid username with letters, numbers, and underscores") {
        REQUIRE(is_valid_username("user_123") == true);
    }

    SECTION("should return true for a valid username with only letters") {
        REQUIRE(is_valid_username("username") == true);
    }

    SECTION("should return false for a username with special characters") {
        REQUIRE(is_valid_username("user-name") == false);
    }

    SECTION("should return false for a username with spaces") {
        REQUIRE(is_valid_username("user name") == false);
    }

    SECTION("should return true for a valid username with only numbers") {
        REQUIRE(is_valid_username("12345") == true);
    }
}