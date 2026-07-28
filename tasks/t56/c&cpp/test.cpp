#include <vector>

TEST_CASE("TestUniqueDeque") {
    SECTION("test_add_unique_elements") {
        UniqueDeque ud;
        REQUIRE(ud.add(1));
        REQUIRE(ud.add(2));
        REQUIRE(ud.add(3));
        REQUIRE(ud.size() == 3);
        std::vector<int> expected = {1, 2, 3};
        std::vector<int> actual(ud.begin(), ud.end());
        REQUIRE(actual == expected);
    }

    SECTION("test_add_duplicate_elements") {
        UniqueDeque ud;
        REQUIRE(ud.add(1));
        REQUIRE_FALSE(ud.add(1));
        REQUIRE(ud.size() == 1);
        std::vector<int> expected = {1};
        std::vector<int> actual(ud.begin(), ud.end());
        REQUIRE(actual == expected);
    }

    SECTION("test_delete_elements") {
        UniqueDeque ud;
        ud.add(1);
        ud.add(2);
        ud.add(3);
        REQUIRE(ud.deleteItem(2));
        REQUIRE_FALSE(ud.deleteItem(2));
        REQUIRE(ud.size() == 2);
        std::vector<int> expected = {1, 3};
        std::vector<int> actual(ud.begin(), ud.end());
        REQUIRE(actual == expected);
    }

    SECTION("test_contains") {
        UniqueDeque ud;
        ud.add(1);
        REQUIRE(ud.contains(1));
        REQUIRE_FALSE(ud.contains(2));
        ud.deleteItem(1);
        REQUIRE_FALSE(ud.contains(1));
    }

    SECTION("test_iter_and_len") {
        UniqueDeque ud;
        ud.add(1);
        ud.add(2);
        REQUIRE(ud.size() == 2);
        std::vector<int> expected = {1, 2};
        std::vector<int> actual(ud.begin(), ud.end());
        REQUIRE(actual == expected);
        ud.deleteItem(1);
        REQUIRE(ud.size() == 1);
        expected = {2};
        actual = std::vector<int>(ud.begin(), ud.end());
        REQUIRE(actual == expected);
    }
}
