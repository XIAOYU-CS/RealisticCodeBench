#include <stdexcept>

template <typename T>
T getValue(const Object& object, const std::string& key) {
    return std::any_cast<T>(object.at(key));
}

TEST_CASE("mergeObjectsWithOverwrite behavior") {
    SECTION("merges non-conflicting keys") {
        Object obj1{{"name", std::string("Alice")}};
        Object obj2{{"age", 30}};

        Object result = mergeObjectsWithOverwrite(obj1, obj2);

        REQUIRE(getValue<std::string>(result, "name") == "Alice");
        REQUIRE(getValue<int>(result, "age") == 30);
    }

    SECTION("second object overwrites conflicts") {
        Object obj1{{"name", std::string("Alice")}, {"age", 25}};
        Object obj2{{"age", 30}};

        Object result = mergeObjectsWithOverwrite(obj1, obj2);

        REQUIRE(getValue<std::string>(result, "name") == "Alice");
        REQUIRE(getValue<int>(result, "age") == 30);
    }

    SECTION("nested object is replaced, not deep-merged") {
        Object obj1{{"user", Object{{"name", std::string("Alice")}, {"age", 25}}}};
        Object obj2{{"user", Object{{"age", 30}}}};

        Object result = mergeObjectsWithOverwrite(obj1, obj2);
        Object user = getValue<Object>(result, "user");

        REQUIRE(user.size() == 1);
        REQUIRE(getValue<int>(user, "age") == 30);
        REQUIRE(user.count("name") == 0);
    }

    SECTION("both empty objects produce an empty object") {
        REQUIRE(mergeObjectsWithOverwrite({}, {}).empty());
    }

    SECTION("empty second object keeps first object") {
        Object obj1{{"enabled", true}};

        Object result = mergeObjectsWithOverwrite(obj1, {});

        REQUIRE(getValue<bool>(result, "enabled"));
    }

    SECTION("empty first object returns second object") {
        Object obj2{{"theme", std::string("dark")}};

        Object result = mergeObjectsWithOverwrite({}, obj2);

        REQUIRE(getValue<std::string>(result, "theme") == "dark");
    }
}
