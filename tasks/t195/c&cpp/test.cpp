TEST_CASE("sort_by_field behavior") {
    const std::vector<Row> data = {
        {{"name", std::string("John")}, {"age", 25}},
        {{"name", std::string("Alice")}, {"age", 30}},
        {{"name", std::string("Bob")}, {"age", 22}},
        {{"name", std::string("Charlie")}, {"age", 28}},
    };

    SECTION("sorts by name ascending") {
        const std::vector<Row> expected = {
            {{"name", std::string("Alice")}, {"age", 30}},
            {{"name", std::string("Bob")}, {"age", 22}},
            {{"name", std::string("Charlie")}, {"age", 28}},
            {{"name", std::string("John")}, {"age", 25}},
        };
        REQUIRE(sort_by_field(data, "name", true) == expected);
    }

    SECTION("sorts by name descending") {
        const std::vector<Row> expected = {
            {{"name", std::string("John")}, {"age", 25}},
            {{"name", std::string("Charlie")}, {"age", 28}},
            {{"name", std::string("Bob")}, {"age", 22}},
            {{"name", std::string("Alice")}, {"age", 30}},
        };
        REQUIRE(sort_by_field(data, "name", false) == expected);
    }

    SECTION("sorts by age ascending") {
        const std::vector<Row> expected = {
            {{"name", std::string("Bob")}, {"age", 22}},
            {{"name", std::string("John")}, {"age", 25}},
            {{"name", std::string("Charlie")}, {"age", 28}},
            {{"name", std::string("Alice")}, {"age", 30}},
        };
        REQUIRE(sort_by_field(data, "age", true) == expected);
    }

    SECTION("sorts by age descending") {
        const std::vector<Row> expected = {
            {{"name", std::string("Alice")}, {"age", 30}},
            {{"name", std::string("Charlie")}, {"age", 28}},
            {{"name", std::string("John")}, {"age", 25}},
            {{"name", std::string("Bob")}, {"age", 22}},
        };
        REQUIRE(sort_by_field(data, "age", false) == expected);
    }

    SECTION("sorts numeric fields by numeric value") {
        const std::vector<Row> mixed_ages = {
            {{"name", std::string("Ten")}, {"age", 10}},
            {{"name", std::string("Two")}, {"age", 2}},
            {{"name", std::string("One")}, {"age", 1}},
        };
        const std::vector<Row> expected = {
            {{"name", std::string("One")}, {"age", 1}},
            {{"name", std::string("Two")}, {"age", 2}},
            {{"name", std::string("Ten")}, {"age", 10}},
        };
        REQUIRE(sort_by_field(mixed_ages, "age", true) == expected);
    }

    SECTION("throws when the field is unavailable") {
        REQUIRE_THROWS_AS(sort_by_field({}, "name", true), std::invalid_argument);
        REQUIRE_THROWS_AS(sort_by_field({{{"name", std::string("Alice")}}}, "age", true), std::invalid_argument);
    }
}
