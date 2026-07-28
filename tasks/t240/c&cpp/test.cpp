#include <string>
#include <vector>

struct Item {
    std::string id;
    std::string name;

    bool operator==(const Item& other) const {
        return id == other.id && name == other.name;
    }
};

TEST_CASE("mergeArraysWithReplacement behavior", "[mergeArraysWithReplacement]") {
    auto getId = [](const Item& item) { return item.id; };

    SECTION("merges two arrays with unique items") {
        std::vector<Item> arr1{{"1", "Item 1"}, {"2", "Item 2"}};
        std::vector<Item> arr2{{"3", "Item 3"}, {"4", "Item 4"}};

        REQUIRE(mergeArraysWithReplacement(arr1, arr2, getId) ==
                std::vector<Item>{{"1", "Item 1"}, {"2", "Item 2"}, {"3", "Item 3"}, {"4", "Item 4"}});
    }

    SECTION("updates existing items when IDs match") {
        std::vector<Item> arr1{{"1", "Item 1"}, {"2", "Item 2"}};
        std::vector<Item> arr2{{"2", "Updated Item 2"}, {"3", "Item 3"}};

        REQUIRE(mergeArraysWithReplacement(arr1, arr2, getId) ==
                std::vector<Item>{{"1", "Item 1"}, {"2", "Updated Item 2"}, {"3", "Item 3"}});
    }

    SECTION("handles empty arrays") {
        REQUIRE(mergeArraysWithReplacement(std::vector<Item>{}, std::vector<Item>{}, getId).empty());
    }

    SECTION("merges with an empty first array") {
        std::vector<Item> arr2{{"1", "Item 1"}, {"2", "Item 2"}};

        REQUIRE(mergeArraysWithReplacement(std::vector<Item>{}, arr2, getId) ==
                std::vector<Item>{{"1", "Item 1"}, {"2", "Item 2"}});
    }

    SECTION("merges with an empty second array") {
        std::vector<Item> arr1{{"1", "Item 1"}, {"2", "Item 2"}};

        REQUIRE(mergeArraysWithReplacement(arr1, std::vector<Item>{}, getId) ==
                std::vector<Item>{{"1", "Item 1"}, {"2", "Item 2"}});
    }

    SECTION("handles duplicate IDs in the first array") {
        std::vector<Item> arr1{{"1", "Item 1"}, {"1", "Duplicate Item 1"}};
        std::vector<Item> arr2{{"2", "Item 2"}};

        REQUIRE(mergeArraysWithReplacement(arr1, arr2, getId) ==
                std::vector<Item>{{"1", "Duplicate Item 1"}, {"2", "Item 2"}});
    }

    SECTION("handles duplicate IDs in the second array") {
        std::vector<Item> arr1{{"1", "Item 1"}};
        std::vector<Item> arr2{{"2", "Item 2"}, {"2", "Duplicate Item 2"}};

        REQUIRE(mergeArraysWithReplacement(arr1, arr2, getId) ==
                std::vector<Item>{{"1", "Item 1"}, {"2", "Duplicate Item 2"}});
    }

    SECTION("merges arrays with mixed unique and duplicate IDs") {
        std::vector<Item> arr1{{"1", "Item 1"}, {"2", "Item 2"}};
        std::vector<Item> arr2{{"2", "Updated Item 2"}, {"3", "Item 3"}, {"1", "New Item 1"}};

        REQUIRE(mergeArraysWithReplacement(arr1, arr2, getId) ==
                std::vector<Item>{{"1", "New Item 1"}, {"2", "Updated Item 2"}, {"3", "Item 3"}});
    }
}
