TEST_CASE("compareObjectsDepth") {
    SECTION("identical empty objects") {
        REQUIRE(compareObjectsDepth(AnyObject{}, AnyObject{}));
    }

    SECTION("same nested structure") {
        AnyObject obj1{{{"a", AnyObject{{{"b", AnyObject{{{"c", AnyObject{}}}}}}}}, {"d", AnyObject{}}}};
        AnyObject obj2{{{"a", AnyObject{{{"b", AnyObject{{{"c", AnyObject{}}}}}}}}, {"d", AnyObject{}}}};
        REQUIRE(compareObjectsDepth(obj1, obj2));
    }

    SECTION("missing top-level key") {
        AnyObject obj1{{{"a", AnyObject{{{"b", AnyObject{}}}}}, {"d", AnyObject{}}}};
        AnyObject obj2{{{"a", AnyObject{{{"b", AnyObject{}}}}}, {"e", AnyObject{}}}};
        REQUIRE_FALSE(compareObjectsDepth(obj1, obj2));
    }

    SECTION("different nested depth") {
        AnyObject obj1{{{"a", AnyObject{{{"b", AnyObject{{{"c", AnyObject{}}}}}}}}, {"d", AnyObject{}}}};
        AnyObject obj2{{{"a", AnyObject{{{"b", AnyObject{}}}}}, {"d", AnyObject{}}}};
        REQUIRE_FALSE(compareObjectsDepth(obj1, obj2));
    }

    SECTION("extra nested key") {
        AnyObject obj1{{{"a", AnyObject{{{"b", AnyObject{}}}}}}};
        AnyObject obj2{{{"a", AnyObject{{{"b", AnyObject{}}, {"c", AnyObject{}}}}}}};
        REQUIRE_FALSE(compareObjectsDepth(obj1, obj2));
    }
}
