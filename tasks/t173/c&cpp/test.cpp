TEST_CASE("compute_pi_to_digits", "[pi]") {
    SECTION("should calculate pi to 5 decimal places correctly") {
        int digits = 5;
        std::string expected = "3.14159";
        std::string result = compute_pi_to_digits(digits);
        REQUIRE(result == expected);
    }

    SECTION("should calculate pi to 10 decimal places correctly") {
        int digits = 10;
        std::string expected = "3.1415926536";
        std::string result = compute_pi_to_digits(digits);
        REQUIRE(result == expected);
    }

    SECTION("should calculate pi to 15 decimal places correctly") {
        int digits = 15;
        std::string expected = "3.141592653589793";
        std::string result = compute_pi_to_digits(digits);
        REQUIRE(result == expected);
    }

    SECTION("should calculate pi to 20 decimal places correctly") {
        int digits = 20;
        std::string expected = "3.14159265358979323846";
        std::string result = compute_pi_to_digits(digits);
        REQUIRE(result == expected);
    }

    SECTION("should calculate pi to 30 decimal places correctly") {
        int digits = 30;
        std::string expected = "3.141592653589793238462643383280";
        std::string result = compute_pi_to_digits(digits);
        REQUIRE(result == expected);
    }
}