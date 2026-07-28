TEST_CASE("Password Validator Tests") {
    SECTION("Valid password") {
        REQUIRE(is_valid_password("Password1!") == true);
    }

    SECTION("Password without a number") {
        REQUIRE(is_valid_password("Password!") == false);
    }

    SECTION("Password without an uppercase letter") {
        REQUIRE(is_valid_password("password1!") == false);
    }

    SECTION("Password without a lowercase letter") {
        REQUIRE(is_valid_password("PASSWORD1!") == false);
    }

    SECTION("Password without a punctuation mark") {
        REQUIRE(is_valid_password("Password1") == false);
    }

    SECTION("Password shorter than 8 characters") {
        REQUIRE(is_valid_password("Pass1!") == false);
    }
}