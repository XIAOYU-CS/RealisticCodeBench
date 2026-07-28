TEST_CASE("is_CAMEL_CASE") {
    SECTION("should return true for a valid camelCase string") {
        REQUIRE(is_CAMEL_CASE("camelCase") == true);
    }

    SECTION("should return true for a valid camelCase string with multiple words") {
        REQUIRE(is_CAMEL_CASE("camelCaseExample") == true);
    }

    SECTION("should return false for a string that starts with an uppercase letter") {
        REQUIRE(is_CAMEL_CASE("CamelCase") == false);
    }

    SECTION("should return false for a string with underscores") {
        REQUIRE(is_CAMEL_CASE("camel_case") == false);
    }

    SECTION("should return false for an empty string") {
        REQUIRE(is_CAMEL_CASE("") == false);
    }
}