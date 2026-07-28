TEST_CASE("cast_strings_to_numbers_recursively") {
    SECTION("flat dictionary") {
        Value input = Value::Map{{"a", "1"}, {"b", "2.5"}, {"c", "not a number"}};
        auto output = cast_strings_to_numbers_recursively(input);
        const auto& map = std::get<Value::Map>(output.data);

        REQUIRE(std::get<int>(map.at("a").data) == 1);
        REQUIRE(std::get<double>(map.at("b").data) == 2.5);
        REQUIRE(std::get<std::string>(map.at("c").data) == "not a number");
    }

    SECTION("nested dictionary") {
        Value input = Value::Map{
            {"x", Value::Map{{"y", "10"}, {"z", "3.14"}}},
            {"w", "20.0"},
        };
        auto output = cast_strings_to_numbers_recursively(input);
        const auto& map = std::get<Value::Map>(output.data);
        const auto& nested = std::get<Value::Map>(map.at("x").data);

        REQUIRE(std::get<int>(nested.at("y").data) == 10);
        REQUIRE(std::get<double>(nested.at("z").data) == 3.14);
        REQUIRE(std::get<double>(map.at("w").data) == 20.0);
    }

    SECTION("list of strings") {
        Value input = Value::List{"1", "2.5", "3", "invalid"};
        auto output = cast_strings_to_numbers_recursively(input);
        const auto& list = std::get<Value::List>(output.data);

        REQUIRE(std::get<int>(list[0].data) == 1);
        REQUIRE(std::get<double>(list[1].data) == 2.5);
        REQUIRE(std::get<int>(list[2].data) == 3);
        REQUIRE(std::get<std::string>(list[3].data) == "invalid");
    }

    SECTION("mixed structure") {
        Value input = Value::Map{
            {"numbers", Value::List{"1", "2.0", 3}},
            {"more_numbers", Value::List{Value::Map{{"num", "4"}}, "5"}},
        };
        auto output = cast_strings_to_numbers_recursively(input);
        const auto& map = std::get<Value::Map>(output.data);
        const auto& numbers = std::get<Value::List>(map.at("numbers").data);
        const auto& moreNumbers = std::get<Value::List>(map.at("more_numbers").data);
        const auto& nested = std::get<Value::Map>(moreNumbers[0].data);

        REQUIRE(std::get<int>(numbers[0].data) == 1);
        REQUIRE(std::get<double>(numbers[1].data) == 2.0);
        REQUIRE(std::get<int>(numbers[2].data) == 3);
        REQUIRE(std::get<int>(nested.at("num").data) == 4);
        REQUIRE(std::get<int>(moreNumbers[1].data) == 5);
    }

    SECTION("empty structure") {
        Value input = Value::Map{};
        auto output = cast_strings_to_numbers_recursively(input);
        REQUIRE(std::get<Value::Map>(output.data).empty());
    }
}
