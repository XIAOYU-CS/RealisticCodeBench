TEST_CASE("isPascalCase", "[PascalCase]") {
    SECTION("valid PascalCase string") {
        REQUIRE(isPascalCase("PascalCase"));
    }

    SECTION("valid PascalCase string with multiple words") {
        REQUIRE(isPascalCase("PascalCaseExample"));
    }

    SECTION("starts with lowercase letter") {
        REQUIRE_FALSE(isPascalCase("pascalCase"));
    }

    SECTION("contains underscore") {
        REQUIRE_FALSE(isPascalCase("Pascal_case"));
    }

    SECTION("empty string") {
        REQUIRE_FALSE(isPascalCase(""));
    }
}
