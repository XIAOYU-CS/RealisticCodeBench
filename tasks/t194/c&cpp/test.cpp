TEST_CASE("calculate_discount_percentage", "[discount]") {
    SECTION("should return 25.00% discount for original price of 100 and actual price of 75") {
        REQUIRE(calculate_discount_percentage(100, 75) == Approx(25.00).margin(0.01));
    }

    SECTION("should return 0.00% discount for original price of 50 and actual price of 50") {
        REQUIRE(calculate_discount_percentage(50, 50) == Approx(0.00).margin(0.01));
    }

    SECTION("should return 100.00% discount for original price of 100 and actual price of 0") {
        REQUIRE(calculate_discount_percentage(100, 0) == Approx(100.00).margin(0.01));
    }

    SECTION("should return 50.00% discount for original price of 200 and actual price of 100") {
        REQUIRE(calculate_discount_percentage(200, 100) == Approx(50.00).margin(0.01));
    }

    SECTION("should handle rounding, overpayment, and invalid prices") {
        REQUIRE(calculate_discount_percentage(3, 2) == Approx(33.33).margin(0.01));
        REQUIRE(calculate_discount_percentage(100, 120) == Approx(-20.00).margin(0.01));
        REQUIRE_THROWS_AS(calculate_discount_percentage(0, 1), std::invalid_argument);
        REQUIRE_THROWS_AS(calculate_discount_percentage(10, -1), std::invalid_argument);
    }
}
