TEST_CASE("check_bit_name_is_3digit_integer") {

    SECTION("should return true for a valid 3-digit number with '.bit' suffix") {
        std::string input = "123.bit";
        bool result = check_bit_name_is_3digit_integer(input);
        REQUIRE(result == true);
    }


    SECTION("should return true for a valid 2-digit number with '.bit' suffix") {
        std::string input = "12.bit";
        bool result = check_bit_name_is_3digit_integer(input);
        REQUIRE(result == true);
    }


    SECTION("should return false for a string with non-numeric characters after removing '.bit'") {
        std::string input = "12a.bit";
        bool result = check_bit_name_is_3digit_integer(input);
        REQUIRE(result == false);
    }


    SECTION("should return true for the lower boundary value '0.bit'") {
        std::string input = "0.bit";
        bool result = check_bit_name_is_3digit_integer(input);
        REQUIRE(result == true);
    }

    SECTION("should return true for the upper boundary value '999.bit'") {
        std::string input = "999.bit";
        bool result = check_bit_name_is_3digit_integer(input);
        REQUIRE(result == true);
    }
}