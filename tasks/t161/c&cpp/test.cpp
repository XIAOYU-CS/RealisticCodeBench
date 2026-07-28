TEST_CASE("sortByTimestamp") {
    SECTION("returns an empty array when input is empty") {
        REQUIRE(sortByTimestamp({}).empty());
    }

    SECTION("handles a single element") {
        std::vector<TimestampRecord> input = {{1, "2021-07-03T12:00:00Z"}};
        REQUIRE(sortByTimestamp(input) == input);
    }

    SECTION("sorts ISO timestamps ascending") {
        std::vector<TimestampRecord> input = {
            {3, "2021-07-01T09:45:00Z"},
            {1, "2021-07-03T12:00:00Z"},
            {2, "2021-07-02T15:30:00Z"}
        };
        std::vector<TimestampRecord> expected = {
            {3, "2021-07-01T09:45:00Z"},
            {2, "2021-07-02T15:30:00Z"},
            {1, "2021-07-03T12:00:00Z"}
        };
        REQUIRE(sortByTimestamp(input) == expected);
    }

    SECTION("leaves an already sorted array in order") {
        std::vector<TimestampRecord> input = {
            {1, "2021-07-01T09:45:00Z"},
            {2, "2021-07-02T15:30:00Z"},
            {3, "2021-07-03T12:00:00Z"}
        };
        REQUIRE(sortByTimestamp(input) == input);
    }

    SECTION("keeps equal timestamps stable") {
        std::vector<TimestampRecord> input = {
            {1, "2021-07-01T09:45:00Z"},
            {2, "2021-07-01T09:45:00Z"},
            {3, "2021-07-02T09:45:00Z"}
        };
        REQUIRE(sortByTimestamp(input) == input);
    }

    SECTION("handles slash and named month timestamp formats") {
        std::vector<TimestampRecord> input = {
            {1, "2021/07/03 12:00:00"},
            {2, "July 2, 2021 15:30:00"},
            {3, "2021-07-01T09:45:00Z"}
        };
        std::vector<TimestampRecord> expected = {
            {3, "2021-07-01T09:45:00Z"},
            {2, "July 2, 2021 15:30:00"},
            {1, "2021/07/03 12:00:00"}
        };
        REQUIRE(sortByTimestamp(input) == expected);
    }
}
