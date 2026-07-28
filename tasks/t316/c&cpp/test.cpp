namespace {

using Dict = std::unordered_map<std::string, std::any>;

std::vector<Dict> make_test_data() {
    return {
        {{"name", std::string("Alice")}, {"age", 30}, {"salary", 50000}},
        {{"name", std::string("Bob")}, {"age", 25}, {"salary", 60000}},
        {{"name", std::string("Charlie")}, {"age", 35}, {"salary", 45000}},
        {{"name", std::string("David")}, {"age", 30}, {"salary", 55000}},
        {{"name", std::string("Eve")}, {"age", 28}}
    };
}

std::string get_string(const Dict& item, const std::string& key) {
    return std::any_cast<std::string>(item.at(key));
}

int get_int(const Dict& item, const std::string& key) {
    return std::any_cast<int>(item.at(key));
}

std::vector<std::string> names_from(const std::vector<Dict>& items) {
    std::vector<std::string> names;
    for (const auto& item : items) {
        names.push_back(get_string(item, "name"));
    }
    return names;
}

} // namespace

TEST_CASE("sort_dicts_by_fields behavior", "[sort_dicts_by_fields]") {
    SECTION("sorts by single field in ascending order") {
        auto result = sort_dicts_by_fields(
            make_test_data(),
            {{"age", true}},
            "default",
            0
        );

        std::vector<int> ages;
        for (const auto& item : result) {
            ages.push_back(get_int(item, "age"));
        }
        REQUIRE(ages == std::vector<int>{25, 28, 30, 30, 35});
    }

    SECTION("sorts by single field in descending order") {
        std::vector<Dict> input = {
            {{"name", std::string("A")}, {"salary", 100}},
            {{"name", std::string("B")}, {"salary", 200}},
            {{"name", std::string("C")}}
        };

        auto result = sort_dicts_by_fields(
            input,
            {{"salary", false}},
            "default",
            0
        );

        REQUIRE(names_from(result) == std::vector<std::string>{"B", "A", "C"});
    }

    SECTION("preserves stable order when priority fields are equal") {
        auto result = sort_dicts_by_fields(
            make_test_data(),
            {{"age", true}},
            "default",
            0
        );

        REQUIRE(names_from(result) == std::vector<std::string>{"Bob", "Eve", "Alice", "David", "Charlie"});
    }

    SECTION("places missing field first") {
        auto result = sort_dicts_by_fields(
            make_test_data(),
            {{"salary", true}},
            "first"
        );

        REQUIRE(get_string(result.front(), "name") == "Eve");
    }

    SECTION("places missing field last") {
        auto result = sort_dicts_by_fields(
            make_test_data(),
            {{"salary", true}},
            "last"
        );

        REQUIRE(get_string(result.back(), "name") == "Eve");
    }

    SECTION("handles empty list") {
        std::vector<Dict> empty;
        auto result = sort_dicts_by_fields(
            empty,
            {{"age", true}},
            "default"
        );

        REQUIRE(result.empty());
    }

    SECTION("sorts string fields in ascending order") {
        auto result = sort_dicts_by_fields(
            make_test_data(),
            {{"name", true}},
            "default"
        );

        REQUIRE(names_from(result) == std::vector<std::string>{"Alice", "Bob", "Charlie", "David", "Eve"});
    }

    SECTION("uses multiple sort fields with priority") {
        auto result = sort_dicts_by_fields(
            make_test_data(),
            {{"age", true}, {"salary", false}},
            "default",
            0
        );

        REQUIRE(names_from(result) == std::vector<std::string>{"Bob", "Eve", "David", "Alice", "Charlie"});
    }

    SECTION("sorts numbers in descending order") {
        std::vector<Dict> input = {
            {{"id", 1}, {"value", 100}},
            {{"id", 2}, {"value", 200}},
            {{"id", 3}, {"value", 50}}
        };

        auto result = sort_dicts_by_fields(
            input,
            {{"value", false}},
            "default",
            0
        );

        std::vector<int> ids;
        for (const auto& item : result) {
            ids.push_back(get_int(item, "id"));
        }
        REQUIRE(ids == std::vector<int>{2, 1, 3});
    }
}
