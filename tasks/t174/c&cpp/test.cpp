TEST_CASE("is_valid_username") {
    SECTION("valid username with alphanumeric characters") {
        REQUIRE(is_valid_username("User123") == true);
    }

    SECTION("valid username with spaces") {
        REQUIRE(is_valid_username("User 123") == true);
    }

    SECTION("invalid username that is too short") {
        REQUIRE(is_valid_username("User") == false);
    }

    SECTION("invalid username that is too long") {
        REQUIRE(is_valid_username("ThisIsAVeryLongUsername") == false);
    }

    SECTION("invalid username with special characters") {
        REQUIRE(is_valid_username("User!") == false);
    }

    SECTION("invalid username with only spaces") {
        REQUIRE(is_valid_username("     ") == false);
    }

    SECTION("invalid username with internal tab") {
        REQUIRE(is_valid_username("User\t123") == false);
    }
}
