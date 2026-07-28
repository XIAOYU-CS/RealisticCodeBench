TEST_CASE("parseTypeHint extracts type names") {
    SECTION("basic type") {
        REQUIRE(parseTypeHint("int") == std::vector<std::string>{"int"});
    }

    SECTION("list type") {
        REQUIRE(parseTypeHint("List[int]") == std::vector<std::string>{"List", "int"});
    }

    SECTION("union type") {
        REQUIRE(parseTypeHint("Union[str, float]") == std::vector<std::string>{"Union", "str", "float"});
    }

    SECTION("complex nested type") {
        REQUIRE(parseTypeHint("List[Union[int, float], Tuple[str, int]]") ==
                std::vector<std::string>{"List", "Union", "int", "float", "Tuple", "str", "int"});
    }

    SECTION("qualified names and literal values") {
        REQUIRE(parseTypeHint("typing.Optional[typing.List[str], None, True, False]") ==
                std::vector<std::string>{"typing.Optional", "typing.List", "str"});
    }
}
