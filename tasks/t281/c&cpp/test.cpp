TEST_CASE("return_string Test Cases", "[return_string]") {
    SECTION("copy a non-empty string") {
        const char* original = "Hello, World!";
        char* copy = return_string(original);
        REQUIRE(std::strcmp(copy, original) == 0);
        REQUIRE(copy != original);
        delete[] copy;
    }

    SECTION("copy an empty string") {
        const char* original = "";
        char* copy = return_string(original);
        REQUIRE(std::strcmp(copy, original) == 0);
        REQUIRE(copy != original);
        delete[] copy;
    }

    SECTION("copy a string with special characters") {
        const char* original = "C++ is fun! @#$%^&*()";
        char* copy = return_string(original);
        REQUIRE(std::strcmp(copy, original) == 0);
        REQUIRE(copy != original);
        delete[] copy;
    }

    SECTION("copy a single character string") {
        const char* original = "A";
        char* copy = return_string(original);
        REQUIRE(std::strcmp(copy, original) == 0);
        REQUIRE(copy != original);
        delete[] copy;
    }

    SECTION("reject null input") {
        REQUIRE_THROWS_AS(return_string(nullptr), std::invalid_argument);
    }
}
