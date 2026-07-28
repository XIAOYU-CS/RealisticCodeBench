TEST_CASE("is_kebabcase", "[kebab-case]") {
    SECTION("should return true for a valid kebab-case string") {
        REQUIRE(is_kebabcase("kebab-case") == true);
    }

    SECTION("should return true for a valid kebab-case string with multiple words") {
        REQUIRE(is_kebabcase("this-is-a-valid-kebab-case") == true);
    }

    SECTION("should return false for a string with uppercase letters") {
        REQUIRE(is_kebabcase("Kebab-Case") == false);
    }

    SECTION("should return false for a string with consecutive hyphens") {
        REQUIRE(is_kebabcase("kebab--case") == false);
    }

    SECTION("should return false for an empty string") {
        REQUIRE(is_kebabcase("") == false);
    }
}