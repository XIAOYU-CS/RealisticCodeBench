TEST_CASE("Valid BMI calculations") {
    SECTION("Normal weight") {
        REQUIRE(calculate_BMI(70, 1.75) == Approx(22.86).epsilon(0.01));
    }

    SECTION("Underweight") {
        REQUIRE(calculate_BMI(50, 1.75) == Approx(16.33).epsilon(0.01));
    }

    SECTION("Overweight") {
        REQUIRE(calculate_BMI(80, 1.75) == Approx(26.12).epsilon(0.01));
    }

    SECTION("Obesity") {
        REQUIRE(calculate_BMI(100, 1.75) == Approx(32.65).epsilon(0.01));
    }
}

// Test case for invalid inputs
TEST_CASE("Invalid BMI calculations") {
    SECTION("Negative weight") {
        REQUIRE_THROWS_AS(calculate_BMI(-70, 1.75), std::invalid_argument);
    }

    SECTION("Zero height") {
        REQUIRE_THROWS_AS(calculate_BMI(70, 0), std::invalid_argument);
    }

    SECTION("Negative height") {
        REQUIRE_THROWS_AS(calculate_BMI(70, -1.75), std::invalid_argument);
    }
}