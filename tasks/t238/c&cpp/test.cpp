TEST_CASE("recursive_object_merge behavior") {
    SECTION("returns obj1 when obj2 is absent") {
        PlainObject obj1 = {{"a", 1}, {"b", 2}};
        REQUIRE(recursive_object_merge(obj1, std::nullopt) == obj1);
    }

    SECTION("empty obj1 preserves obj2") {
        PlainObject obj1;
        PlainObject obj2 = {{"a", 1}, {"b", PlainObject{{"c", 2}}}};
        REQUIRE(recursive_object_merge(obj1, obj2) == obj2);
    }

    SECTION("merges deeply nested objects") {
        PlainObject obj1 = {{"a", PlainObject{{"b", PlainObject{{"c", 1}}}}}, {"d", 2}};
        PlainObject obj2 = {{"a", PlainObject{{"b", PlainObject{{"e", 3}}}}}, {"f", 4}};
        PlainObject expected = {{"a", PlainObject{{"b", PlainObject{{"c", 1}, {"e", 3}}}}}, {"d", 2}, {"f", 4}};
        REQUIRE(recursive_object_merge(obj1, obj2) == expected);
    }

    SECTION("obj1 wins when property types conflict") {
        PlainObject obj1 = {{"a", 1}, {"b", nullptr}, {"c", PlainObject{{"nested", true}}}};
        PlainObject obj2 = {{"a", PlainObject{{"old", true}}}, {"b", PlainObject{{"old", true}}}, {"c", 3}, {"d", 4}};
        PlainObject expected = {{"a", 1}, {"b", nullptr}, {"c", PlainObject{{"nested", true}}}, {"d", 4}};
        REQUIRE(recursive_object_merge(obj1, obj2) == expected);
    }

    SECTION("arrays are copied from obj1 instead of merged") {
        PlainObject obj1 = {{"a", Value::Array{1, 2, 3}}};
        PlainObject obj2 = {{"a", Value::Array{4, 5}}};
        PlainObject expected = {{"a", Value::Array{1, 2, 3}}};
        REQUIRE(recursive_object_merge(obj1, obj2) == expected);
    }
}
