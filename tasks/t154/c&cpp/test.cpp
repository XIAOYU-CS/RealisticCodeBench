TEST_CASE("is_significant_number") {
    SECTION("should return true for a valid significant number with exactly 5 digits") {
        REQUIRE(is_significant_number("12345") == true);
    }

    SECTION("should return false for a number with leading zero") {
        REQUIRE(is_significant_number("01234") == false);
    }

    SECTION("should return true for a valid significant number with exactly 18 digits") {
        REQUIRE(is_significant_number("123456789012345678") == true);
    }

    SECTION("should return false for a number with less than 5 digits") {
        REQUIRE(is_significant_number("123") == false);
    }

    SECTION("should return false for a number with more than 18 digits") {
        REQUIRE(is_significant_number("1234567890123456789") == false);
    }

    SECTION("should return false for a number containing non-digit characters") {
        REQUIRE(is_significant_number("1234a") == false);
    }

    SECTION("should return false for a single zero") {
        REQUIRE(is_significant_number("0") == false);
    }
}