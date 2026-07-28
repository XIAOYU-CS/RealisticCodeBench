TEST_CASE("sortByKey behavior") {
    SECTION("empty array") {
        REQUIRE(sortByKey({}, "name").empty());
    }

    SECTION("single element") {
        std::vector<Record> input = {{{"name", "Apple"}}};
        REQUIRE(sortByKey(input, "name") == input);
    }

    SECTION("sorts by key") {
        std::vector<Record> input = {{{"name", "banana"}}, {{"name", "apple"}}, {{"name", "orange"}}};
        std::vector<Record> expected = {{{"name", "apple"}}, {{"name", "banana"}}, {{"name", "orange"}}};
        REQUIRE(sortByKey(input, "name") == expected);
    }

    SECTION("sorts case-insensitively") {
        std::vector<Record> input = {{{"name", "banana"}}, {{"name", "Apple"}}, {{"name", "orange"}}};
        std::vector<Record> expected = {{{"name", "Apple"}}, {{"name", "banana"}}, {{"name", "orange"}}};
        REQUIRE(sortByKey(input, "name") == expected);
    }

    SECTION("missing key sorts before named values") {
        std::vector<Record> input = {
            {{"name", "beta"}},
            {{"other", "missing name"}},
            {{"name", "Alpha"}},
        };
        std::vector<Record> expected = {
            {{"other", "missing name"}},
            {{"name", "Alpha"}},
            {{"name", "beta"}},
        };
        REQUIRE(sortByKey(input, "name") == expected);
    }
}
