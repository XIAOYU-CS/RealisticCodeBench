TEST_CASE("TestIsCompliantFourDigit", "[is_compliant_four_digit]") {
    SECTION("test_positive_four_digit_number") {
        REQUIRE(is_compliant_four_digit(1234));
    }

    SECTION("test_boundary_values") {
        REQUIRE(is_compliant_four_digit(1000));
        REQUIRE(is_compliant_four_digit(9999));
    }

    SECTION("test_negative_four_digit_number") {
        REQUIRE_FALSE(is_compliant_four_digit(-1234));
    }

    SECTION("test_zero") {
        REQUIRE_FALSE(is_compliant_four_digit(0));
    }

    SECTION("test_out_of_range_number") {
        REQUIRE_FALSE(is_compliant_four_digit(999));
        REQUIRE_FALSE(is_compliant_four_digit(10000));
    }
}
