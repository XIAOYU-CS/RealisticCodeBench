
#include <type_traits>
#include <vector>
#include <stdexcept>

TEST_CASE("TestReadOnlyListProxy") {
    std::vector<int> test_data = {1, 2, 3, 4, 5};
    ReadOnlyListProxy<int> proxy(test_data);

    SECTION("test_initialization_with_list") {
        ReadOnlyListProxy<int> proxy({1, 2, 3});
        REQUIRE(proxy.size() == 3);
        REQUIRE(proxy[0] == 1);
    }

    SECTION("test_initialization_with_tuple") {
        ReadOnlyListProxy<int> proxy(std::vector<int>{1, 2, 3, 4});
        REQUIRE(proxy.size() == 4);
        REQUIRE(proxy[1] == 2);
    }

    SECTION("test_getitem_with_index") {
        REQUIRE(proxy[0] == 1);
        REQUIRE(proxy[2] == 3);
        REQUIRE(proxy[-1] == 5);
    }

    SECTION("test_getitem_with_slice") {
        REQUIRE(proxy.slice(1, 3) == std::vector<int>{2, 3});
        REQUIRE(proxy.slice(0, 2) == std::vector<int>{1, 2});
        REQUIRE(proxy.slice(0, proxy.size(), 2) == std::vector<int>{1, 3, 5});
    }

    SECTION("test_len") {
        REQUIRE(proxy.size() == 5);
        ReadOnlyListProxy<int> empty_proxy({});
        REQUIRE(empty_proxy.size() == 0);
    }

    SECTION("test_contains") {
        REQUIRE(proxy.contains(3));
        REQUIRE_FALSE(proxy.contains(6));
    }

    SECTION("test_iter") {
        std::vector<int> result(proxy.begin(), proxy.end());
        REQUIRE(result == std::vector<int>{1, 2, 3, 4, 5});
    }

    SECTION("test_reversed") {
        std::vector<int> result(proxy.rbegin(), proxy.rend());
        REQUIRE(result == std::vector<int>{5, 4, 3, 2, 1});
    }

    SECTION("test_index_and_count") {
        REQUIRE(proxy.index(3) == 2);
        REQUIRE(proxy.index(1, 0, 3) == 0);

        ReadOnlyListProxy<int> proxy_with_duplicates({1, 2, 2, 3, 2});
        REQUIRE(proxy_with_duplicates.count(2) == 3);
        REQUIRE(proxy_with_duplicates.count(4) == 0);
    }

    SECTION("test_all_modification_operations_raise_error") {
        REQUIRE(std::is_const_v<std::remove_reference_t<decltype(proxy[0])>>);
        REQUIRE_THROWS_AS(proxy.erase(0), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.insert(0, 10), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.push_back(6), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.clear(), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.reverse(), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.extend({6, 7}), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.pop(), std::runtime_error);
        REQUIRE_THROWS_AS(proxy.remove(3), std::runtime_error);
        REQUIRE_THROWS_AS((proxy += std::vector<int>{6, 7}), std::runtime_error);
    }

    SECTION("test_repr") {
        std::string expected = "ReadOnlyListProxy([1, 2, 3, 4, 5])";
        REQUIRE(proxy.repr() == expected);

        ReadOnlyListProxy<int> empty_proxy({});
        REQUIRE(empty_proxy.repr() == "ReadOnlyListProxy([])");
    }
}
