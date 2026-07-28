TEST_CASE("SmartConvert Tests", "[numericalStrConvert]") {
    SECTION("Convert integer") {
        REQUIRE(numerical_str_convert("123") == std::variant<int, float, std::string>{123});
    }

    SECTION("Convert float") {
        REQUIRE(numerical_str_convert("123.45") == std::variant<int, float, std::string>{123.45f});
    }

    SECTION("Convert non-numeric string") {
        REQUIRE(numerical_str_convert("abc") == std::variant<int, float, std::string>{std::string("abc")});
    }

    SECTION("Convert negative integer") {
        REQUIRE(numerical_str_convert("-456") == std::variant<int, float, std::string>{-456});
    }

    SECTION("Convert negative float") {
        REQUIRE(numerical_str_convert("-456.78") == std::variant<int, float, std::string>{-456.78f});
    }
}
