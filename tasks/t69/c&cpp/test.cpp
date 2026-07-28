TEST_CASE("check_method_arg_types", "[type-check]") {
    const std::vector<ParameterInfo> parameters = {
        {"a", "int"},
        {"b", "string"},
        {"c", "double"},
    };

    SECTION("matching arguments pass") {
        REQUIRE_NOTHROW(check_method_arg_types(parameters, {
            {"a", "int"},
            {"b", "string"},
            {"c", "double"},
        }));
    }

    SECTION("type mismatch throws") {
        REQUIRE_THROWS_AS(check_method_arg_types(parameters, {
            {"a", "string"},
            {"b", "string"},
            {"c", "double"},
        }), std::invalid_argument);
    }

    SECTION("excluded parameter is skipped") {
        REQUIRE_NOTHROW(check_method_arg_types(parameters, {
            {"a", "string"},
            {"b", "string"},
            {"c", "double"},
        }, {"a"}));
    }

    SECTION("missing defaulted arguments are ignored") {
        REQUIRE_NOTHROW(check_method_arg_types(parameters, {
            {"a", "int"},
        }));
    }

    SECTION("exclude list is not mutated") {
        std::vector<std::string> exclude = {"a"};
        REQUIRE_NOTHROW(check_method_arg_types(parameters, {
            {"a", "string"},
            {"b", "string"},
            {"c", "double"},
        }, exclude));
        REQUIRE(exclude == std::vector<std::string>{"a"});
    }
}
