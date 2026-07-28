TEST_CASE("abbreviate_number_with_suffix") {
    SECTION("should return the same number for values less than 1000") {
        REQUIRE(abbreviate_number_with_suffix(999) == "999");
    }

    SECTION("should return '1k' for 1000") {
        std::string result = abbreviate_number_with_suffix(1000);
        REQUIRE((result == "1k" || result == "1.0k"));
    }

    SECTION("should return '1.5k' for 1500") {
        REQUIRE(abbreviate_number_with_suffix(1500) == "1.5k");
    }

    SECTION("should return '1M' for 1 million") {
        std::string result = abbreviate_number_with_suffix(1000000);
        REQUIRE((result == "1M" || result == "1.0M"));
    }

    SECTION("should return '25M' for 25 million") {
        REQUIRE(abbreviate_number_with_suffix(25000000) == "25M");
    }

    SECTION("should return '1B' for 1 billion") {
        std::string result = abbreviate_number_with_suffix(1000000000);
        REQUIRE((result == "1B" || result == "1.0B"));
    }

    SECTION("should return '1.2T' for 1.2 trillion") {
        REQUIRE(abbreviate_number_with_suffix(1234567890123) == "1.2T");
    }
}
