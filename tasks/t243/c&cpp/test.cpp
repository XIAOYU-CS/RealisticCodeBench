TEST_CASE("format_post_count", "[format_post_count]") {
    SECTION("single post uses singular label") {
        REQUIRE(format_post_count(1) == "01 Post");
    }

    SECTION("two posts are zero-padded") {
        REQUIRE(format_post_count(2) == "02 Posts");
    }

    SECTION("two-digit count is unchanged") {
        REQUIRE(format_post_count(10) == "10 Posts");
    }

    SECTION("large two-digit count is unchanged") {
        REQUIRE(format_post_count(99) == "99 Posts");
    }

    SECTION("single-digit plural count is zero-padded") {
        REQUIRE(format_post_count(5) == "05 Posts");
    }
}
