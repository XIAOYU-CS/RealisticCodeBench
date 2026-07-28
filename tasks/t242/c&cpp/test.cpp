TEST_CASE("mask_bank_account_number", "[mask_bank_account_number]") {
    SECTION("should return \"****4567\" for an account number of \"12345678901234567\"") {
        REQUIRE(mask_bank_account_number("12345678901234567") == "****4567");
    }

    SECTION("should return \"****6543\" for an account number of \"98765432109876543\"") {
        REQUIRE(mask_bank_account_number("98765432109876543") == "****6543");
    }

    SECTION("should return \"****1100\" for an account number of \"11111111111111100\"") {
        REQUIRE(mask_bank_account_number("11111111111111100") == "****1100");
    }

    SECTION("should throw an error for an account number shorter than 17 characters") {
        REQUIRE_THROWS_AS(mask_bank_account_number("1234567890123456"), std::invalid_argument);
    }

    SECTION("should throw an error for an account number longer than 17 characters") {
        REQUIRE_THROWS_AS(mask_bank_account_number("123456789012345678"), std::invalid_argument);
    }

    SECTION("should throw an error for an account number with 0 characters") {
        REQUIRE_THROWS_AS(mask_bank_account_number(""), std::invalid_argument);
    }

    SECTION("should throw an error for a 17-character account number with non-digits") {
        REQUIRE_THROWS_AS(mask_bank_account_number("1234567890123abcd"), std::invalid_argument);
    }
}
