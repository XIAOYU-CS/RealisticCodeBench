static Value text(const string& value) {
    return Value(value);
}

TEST_CASE("Test basic string to integer conversion", "[convert_strings_to_numbers]") {
    Value result = convert_strings_to_numbers(text("123"));
    REQUIRE(get<int>(result) == 123);
}

TEST_CASE("Test basic string to float conversion", "[convert_strings_to_numbers]") {
    Value result = convert_strings_to_numbers(text("123.45"));
    REQUIRE(get<double>(result) == Approx(123.45));
}

TEST_CASE("Test conversion in nested dictionary", "[convert_strings_to_numbers]") {
    Dict input_data = {
        {"a", text("123")},
        {"b", Value(Dict{
            {"c", text("45.67")},
            {"d", text("hello")}
        })}
    };
    Dict expected = {
        {"a", 123},
        {"b", Value(Dict{
            {"c", 45.67},
            {"d", text("hello")}
        })}
    };
    Value result = convert_strings_to_numbers(input_data);
    REQUIRE(get<Dict>(result) == expected);
}

TEST_CASE("Test conversion in list with mixed types", "[convert_strings_to_numbers]") {
    List input_data = {text("123"), text("45.67"), text("hello"), 42, nullptr};
    List expected = {123, 45.67, text("hello"), 42, nullptr};
    Value result = convert_strings_to_numbers(input_data);
    REQUIRE(get<List>(result) == expected);
}

TEST_CASE("Test with custom converter function", "[convert_strings_to_numbers]") {
    auto custom_bool_converter = [](const string& s) -> Value {
        if (s == "true") return true;
        if (s == "false") return false;
        return text(s);
    };

    Dict input_data = {
        {"number", text("123")},
        {"boolean", text("true")},
        {"text", text("hello")}
    };
    Dict expected = {
        {"number", 123},
        {"boolean", true},
        {"text", text("hello")}
    };
    Value result = convert_strings_to_numbers(input_data, {custom_bool_converter});
    REQUIRE(get<Dict>(result) == expected);
}
